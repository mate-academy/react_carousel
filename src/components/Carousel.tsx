import React, { useEffect, useRef } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const shiftRef = useRef(0);

  const extendedImages = infinite ? [...images, ...images, ...images] : images;
  const middleIndex = images.length;
  const initialShift = infinite ? -(middleIndex * itemWidth) : 0;

  useEffect(() => {
    shiftRef.current = initialShift;
    if (listRef.current) {
      listRef.current.style.transform = `translate(${initialShift}px, 0)`;
    }
  }, [images, infinite]);

  const move = (direction: 'next' | 'previous') => {
    const delta = step * itemWidth;
    const change = direction === 'next' ? -delta : delta;

    let newShift = shiftRef.current + change;

    if (!infinite) {
      const maxShift = 0;
      const minShift = -((images.length - frameSize) * itemWidth);

      newShift = Math.max(minShift, Math.min(maxShift, newShift));
    }

    shiftRef.current = newShift;

    if (listRef.current) {
      listRef.current.style.transition = `transform ${animationDuration}ms`;
      listRef.current.style.transform = `translate(${newShift}px, 0)`;
    }

    if (infinite) {
      const limitLeft = -(extendedImages.length - middleIndex) * itemWidth;
      const limitRight = -(middleIndex * itemWidth);

      if (newShift > limitRight + delta) {
        setTimeout(() => {
          if (!listRef.current) {
            return;
          }

          listRef.current.style.transition = 'none';
          shiftRef.current = -(middleIndex * itemWidth);
          listRef.current.style.transform = `translate(${shiftRef.current}px, 0)`;
        }, animationDuration);
      }

      if (newShift < limitLeft - delta) {
        setTimeout(() => {
          if (!listRef.current) {
            return;
          }

          listRef.current.style.transition = 'none';
          shiftRef.current = -(middleIndex * itemWidth);
          listRef.current.style.transform = `translate(${shiftRef.current}px, 0)`;
        }, animationDuration);
      }
    }
  };

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        ref={listRef}
        style={{
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {(infinite ? extendedImages : images).map((imageSrc, index) => (
          <li className="Carousel__listItem" key={index}>
            <img
              className="Carousel__image"
              src={imageSrc}
              alt="carousel"
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        className="Carousel__button--previous"
        type="button"
        onClick={() => move('previous')}
      >
        Prev
      </button>

      <button
        className="Carousel__button--next"
        type="button"
        onClick={() => move('next')}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
