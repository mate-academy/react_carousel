import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const horizontalGap = 10;

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carousel = useRef<HTMLUListElement>(null);

  const slideCarousel = useCallback(
    (newIndex: number) => {
      if (carousel.current) {
        carousel.current.style.transform = `translateX(-${newIndex * (itemWidth + horizontalGap)}px)`;
      }
    },
    [itemWidth],
  );

  const handleNextSlides = () => {
    setActiveSlide(curIndex => {
      const nextIndex = curIndex + step;

      let newIndex;

      if (infinite) {
        if (nextIndex >= images.length - frameSize) {
          if (curIndex < images.length - frameSize) {
            newIndex = images.length - frameSize;
          } else {
            newIndex = 0;
          }
        } else {
          newIndex = nextIndex;
        }
      } else {
        newIndex = Math.min(nextIndex, images.length - frameSize);
      }

      slideCarousel(newIndex);

      return newIndex;
    });
  };

  const handlePrevSlides = () => {
    setActiveSlide(curIndex => {
      const prevIndex = curIndex - step;
      let newIndex;

      if (infinite) {
        if (prevIndex < 0) {
          if (curIndex > 0) {
            newIndex = 0;
          } else {
            newIndex = Math.max(images.length - frameSize, 0);
          }
        } else {
          newIndex = prevIndex;
        }
      } else {
        newIndex = Math.max(prevIndex, 0);
      }

      slideCarousel(newIndex);

      return newIndex;
    });
  };

  useEffect(() => {
    setActiveSlide(0);
    slideCarousel(0);
  }, [frameSize, itemWidth, infinite, slideCarousel]);

  useEffect(() => {
    slideCarousel(activeSlide);
  }, [
    activeSlide,
    itemWidth,
    frameSize,
    animationDuration,
    step,
    infinite,
    slideCarousel,
  ]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__slides"
        style={{
          width: `${itemWidth * frameSize + (frameSize - 1) * horizontalGap}px`,
        }}
      >
        <ul
          className="Carousel__list"
          ref={carousel}
          style={{
            transition: `transform ${animationDuration}ms ease`,
            gap: `${horizontalGap}px`,
          }}
        >
          {images.map((img, i) => (
            <li key={`${img}_${i}`} className="Carousel__item">
              <img
                src={img}
                alt={`${i}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="Carousel__arrow Carousel__arrow--prev"
        onClick={handlePrevSlides}
        disabled={!infinite && activeSlide === 0}
      ></button>
      <button
        data-cy="next"
        type="button"
        className="Carousel__arrow Carousel__arrow--next"
        onClick={handleNextSlides}
        disabled={!infinite && images.length - activeSlide <= frameSize}
      ></button>
    </div>
  );
};
