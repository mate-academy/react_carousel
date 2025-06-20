import React, { useState, useEffect, useRef, useCallback } from 'react';

// Interface para as propriedades do Carousel
interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const carouselListRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(infinite ? frameSize : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [actualImages, setActualImages] = useState<string[]>(images);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    if (infinite && images.length > 0) {
      const duplicatedImages = [
        ...images.slice(-frameSize),
        ...images,
        ...images.slice(0, frameSize),
      ];

      setActualImages(duplicatedImages);

      setCurrentIndex(frameSize);
    } else {
      setActualImages(images);
      setCurrentIndex(0);
    }

    setTransitionEnabled(false);
  }, [images, infinite, frameSize]);

  const getOffset = useCallback(() => {
    return -currentIndex * itemWidth;
  }, [currentIndex, itemWidth]);

  useEffect(() => {
    if (carouselListRef.current) {
      carouselListRef.current.style.transform = `translateX(${getOffset()}px)`;
      carouselListRef.current.style.transition = transitionEnabled
        ? `transform ${animationDuration}ms ease-in-out`
        : 'none';
    }
  }, [getOffset, animationDuration, transitionEnabled]);

  // Lida com o evento de término da transição para o loop infinito
  useEffect(() => {
    const listElement = carouselListRef.current;

    const handleTransitionEnd = () => {
      setIsTransitioning(false); // Reseta o estado de transição

      if (infinite) {
        if (currentIndex >= actualImages.length - frameSize) {
          setTransitionEnabled(false);
          setCurrentIndex(frameSize);
        } else if (currentIndex < frameSize) {
          setTransitionEnabled(false);
          setCurrentIndex(actualImages.length - 2 * frameSize);
        }
      }

      setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
    };

    if (listElement) {
      listElement.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [currentIndex, infinite, actualImages.length, frameSize]);

  // Lida com o clique no botão "Próximo"
  const handleNext = () => {
    if (isTransitioning || images.length === 0) {
      return;
    }

    setTransitionEnabled(true);
    setIsTransitioning(true);

    let nextIndex = currentIndex + step;

    if (!infinite) {
      const maxIndex = actualImages.length - frameSize;

      if (nextIndex > maxIndex) {
        nextIndex = maxIndex;
      }
    }

    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    if (isTransitioning || images.length === 0) {
      return;
    }

    setTransitionEnabled(true);

    setIsTransitioning(true);

    let prevIndex = currentIndex - step;

    if (!infinite) {
      if (prevIndex < 0) {
        prevIndex = 0;
      }
    }

    setCurrentIndex(prevIndex);
  };

  const isPrevDisabled = !infinite && currentIndex === 0;

  const isNextDisabled =
    !infinite && currentIndex >= actualImages.length - frameSize;
  const canScroll = images.length > frameSize;

  return (
    <div
      className="relative overflow-hidden
      rounded-xl shadow-xl
      border border-gray-300
      bg-white"
      style={{ width: `${itemWidth * frameSize + 40}px` }}
    >
      <div className="flex items-center justify-center p-5">
        <ul
          ref={carouselListRef}
          className="flex"
          style={{
            transform: `translateX(${getOffset()}px)`,
            transitionDuration: transitionEnabled
              ? `${animationDuration}ms`
              : '0ms',
          }}
        >
          {actualImages.map((image, index) => (
            <li
              key={index}
              className="flex-shrink-0 flex items-center justify-center p-2"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={image}
                alt={`Carousel ${index + 1}`}
                className="w-full h-auto rounded-lg
                shadow-md border border-gray-200 object-cover"
                onError={e => {
                  const target = e.currentTarget;

                  target.src = `https://placehold.co/${itemWidth}x90/CCCCCC/666666?text=Error`;
                  target.alt = 'Load Error';
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="absolute top-1/2
        left-0 right-0
        flex justify-between
        transform -translate-y-1/2 px-4"
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabled || isTransitioning || !canScroll}
          className={`
            p-3 bg-blue-500
            text-white rounded-full
            shadow-lg hover:bg-blue-600
            focus:outline-none focus:ring-2
            focus:ring-blue-500
            focus:ring-opacity-75
            transition-all
            duration-300
            ease-in-out transform hover:scale-110
            ${isPrevDisabled || !canScroll ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleNext}
          data-cy="next"
          disabled={isNextDisabled || isTransitioning || !canScroll}
          className={`
            p-3 bg-blue-500
            text-white rounded-full
            shadow-lg hover:bg-blue-600
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:ring-opacity-75
            transition-all duration-300
            ease-in-out transform hover:scale-110
            ${isNextDisabled || !canScroll ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
