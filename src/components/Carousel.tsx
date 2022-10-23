import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[]
  step: string
  itemWidth: string
  frameSize: string
  scroll: number
  scrollFn: (arg: number) => void
  animationDuration: string
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
  const disabledPrev = (scroll) * -1 * +itemWidth <= 0;
  const disabledNext = images.length
  * +itemWidth <= (scroll - +frameSize) * -1 * +itemWidth;

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
          {images.map((img) => {
            return (
              <li key={img}>
                <img
                  src={img}
                  alt="1"
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
