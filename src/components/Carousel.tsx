/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useRef, useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number | string;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = '130',
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}: Props) => {
  const countClones = Math.max(frameSize, step);
  const [currentIndex, setCurrentIndex] = useState(infinite ? countClones : 0);
  const itemWid =
    typeof itemWidth === 'string' ? parseInt(itemWidth) : itemWidth;
  const offset = currentIndex * itemWid;
  const sliderRef = useRef<HTMLUListElement>(null);

  const [transition, setTransition] = useState(true);
  const imagesForView = infinite
    ? [
        ...images.slice(-countClones),
        ...images,
        ...images.slice(0, countClones),
      ]
    : [...images];

  const handleTransitionEnd = () => {
    if (currentIndex >= images.length + countClones) {
      setTransition(false);
      setCurrentIndex(currentIndex - images.length);
    }

    if (currentIndex < countClones) {
      setTransition(false);
      setCurrentIndex(currentIndex + images.length);
    }
  };

  useEffect(() => {
    if (!transition) {
      const id = requestAnimationFrame(() => {
        setTransition(true);
      });

      return () => cancelAnimationFrame(id);
    }
  }, [transition]);

  return (
    <>
      <div
        className="Carousel"
        style={{
          width: `${itemWid * frameSize}px`,
          overflow: 'hidden',
          scrollSnapAlign: 'start',
        }}
      >
        <ul
          className="Carousel__list"
          ref={sliderRef}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            transform: `translateX(-${offset}px)`,
            transition: transition
              ? `transform ${animationDuration}ms ease`
              : 'none',
          }}
          onTransitionEnd={infinite ? handleTransitionEnd : undefined}
        >
          {imagesForView.map((image, index) => (
            <li key={`${index}-${image}`}>
              <img src={image} alt={`${index + 1}`} width={`${itemWid}`} />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => {
          setCurrentIndex(
            !infinite ? Math.max(currentIndex - step, 0) : prev => prev - step,
          );
        }}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={() => {
          setCurrentIndex(
            !infinite
              ? Math.min(currentIndex + step, images.length - frameSize)
              : prev => prev + step,
          );
        }}
      >
        Next
      </button>
    </>
  );
};

export default Carousel;
