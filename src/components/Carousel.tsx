import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [scroll, setScroll] = useState(0);
  const widthFrame = frameSize * itemWidth;
  const lastImagePosition = images.length - frameSize;

  const disablePrev = scroll === 0 && !infinite;
  const disableNext = scroll === lastImagePosition && !infinite;

  const handlerNext = () => {
    if (infinite && scroll === lastImagePosition) {
      setScroll(0);
    } else {
      setScroll(current => Math.min(current + step, lastImagePosition));
    }
  };

  const handlerPrev = () => {
    if (infinite && scroll === 0) {
      setScroll(lastImagePosition);
    } else {
      setScroll(current => Math.max(current - step, 0));
    }
  };

  return (
    <div className="Carousel" style={{ width: `${widthFrame - 1}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translate(-${scroll * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, index) => {
          return (
            <li key={`key-${index}`}>
              <img width={itemWidth} src={image} alt={`image-${index + 1}`} />
            </li>
          );
        })}
      </ul>

      <div className="Carousel__btns">
        <button
          type="button"
          data-action="prev"
          className="Carousel__bnt Carousel__bnt--prev"
          onClick={handlerPrev}
          disabled={disablePrev}
          style={{ opacity: disablePrev ? '0.5' : '' }}
        >
          {'<'}
        </button>

        <button
          data-cy='next'
          type="button"
          data-action="next"
          className="Carousel__bnt Carousel__bnt--next"
          onClick={handlerNext}
          disabled={disableNext}
          style={{ opacity: disableNext ? '0.5' : '' }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
