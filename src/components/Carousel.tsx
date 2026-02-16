import React, { useState } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWid =
    typeof itemWidth === 'string' ? parseInt(itemWidth) : itemWidth;
  const offset = currentIndex * itemWid;

  return (
    //<div className="wrapper" style={{ width: `${itemWidth * frameSize}px` }}>
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
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            transform: `translateX(-${offset}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={`${index}-${image}`}>
              <img src={image} alt={`${index + 1}`} width={`${itemWidth}`} />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setCurrentIndex(Math.max(currentIndex - step, 0))}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={() => {
          const nextIndex = currentIndex + step;

          if (nextIndex > images.length - step) {
          }

          setCurrentIndex(
            !infinite
              ? Math.min(nextIndex, images.length - step)
              : currentIndex,
          );
        }}
      >
        Next
      </button>
    </>
    //</div>
  );
};

export default Carousel;
