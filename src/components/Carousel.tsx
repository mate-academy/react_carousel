import React, { useRef } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const clickedRef = useRef(0);
  const maxIndex = Math.max(0, images.length - frameSize);
  const maxSlides = Math.ceil(maxIndex / step);

  const viewRef = useRef<HTMLUListElement | null>(null);

  const styles = {
    '--animation-duration': `${animationDuration}ms`,
    '--frame-size': `${frameSize * itemWidth}px`,
  } as React.CSSProperties;

  const MoveSlide = (direction: 'next' | 'prev') => {
    switch (direction) {
      case 'next':
        if (infinite) {
          clickedRef.current++;

          if (infinite && clickedRef.current > maxSlides) {
            clickedRef.current = 0;
          }
        } else {
          if (clickedRef.current < maxSlides) {
            clickedRef.current++;
          }
        }

        break;

      case 'prev':
        if (infinite) {
          clickedRef.current--;

          if (clickedRef.current < 0) {
            clickedRef.current = maxSlides;
          }
        } else {
          if (clickedRef.current > 0) {
            clickedRef.current--;
          }
        }

        break;
    }

    const maxOffset = Math.max(0, images.length - frameSize);
    const desiredOffset = clickedRef.current * step;
    const offset = Math.min(desiredOffset, maxOffset);

    viewRef.current!.style.transform = `translateX(-${itemWidth * offset}px)`;
  };

  return (
    <div className="Carousel" style={styles}>
      <div className="Carousel__list">
        <ul className="Carousel__view" ref={viewRef}>
          {images.map((img, idx) => {
            return (
              <li key={idx}>
                <img
                  src={img}
                  alt={(idx + 1).toString()}
                  style={{ width: itemWidth }}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button type="button" onClick={() => MoveSlide('prev')}>
        Prev
      </button>
      <button type="button" onClick={() => MoveSlide('next')} data-cy="next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
