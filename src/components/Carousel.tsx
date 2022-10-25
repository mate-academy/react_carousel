import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[]
  step: number
  itemWidth: number
  frameSize: number
  scroll: number
  scrollFn: (arg: number) => void
  animationDuration: number
}
const Carousel: React.FC<Props> = ({
  images,
  step,
  itemWidth,
  frameSize,
  scroll,
  scrollFn,
  animationDuration,
}) => {
  const rowWidth = images.length * +itemWidth;
  const disabledPrev = (scroll * -1 * itemWidth) <= 0;
  const disabledNext = rowWidth <= (scroll - frameSize) * -1 * +itemWidth;

  return (
    <div className="Carousel">
      <div
        className="slider"
        style={{
          width: `${+frameSize * +itemWidth}px`,
        }}
      >
        <div
          className="slider__rov"
          style={{
            transform: `translateX(${scroll * +itemWidth}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((imgPath, i) => {
            return (
              <li key={imgPath}>
                <img
                  src={imgPath}
                  alt={`${i}`}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                  className="carousel__img"
                />
              </li>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          scrollFn(scroll + +step);
        }}
        disabled={disabledPrev}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => scrollFn(scroll - +step)}
        disabled={disabledNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
