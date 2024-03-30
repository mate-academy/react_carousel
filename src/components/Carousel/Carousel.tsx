import React, { useState } from 'react';
import './Carousel.scss';
import { CarouselProps } from './types';

const GAP = 10;

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentPos, setPos] = useState<number>(0);

  const containerStyles = {
    width: `${frameSize * (itemWidth + GAP) - GAP}px`,
  };

  const listStyles = {
    transform: `translateX(${-currentPos * (itemWidth + GAP)}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const changePos = (isInrease: boolean) => {
    let newPos = isInrease ? currentPos + step : currentPos - step;

    if (infinite) {
      newPos = newPos < 0 ? images.length - newPos : newPos % images.length;
    } else if (newPos < 0) {
      newPos = 0;
    } else if (newPos >= images.length) {
      newPos = images.length - 1;
    }

    setPos(newPos);
  };

  const nextHandler = () => changePos(true);
  const previousHandler = () => changePos(false);

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={containerStyles}>
        <ul className="Carousel__list" style={listStyles}>
          {images.map(image => (
            <li key={image}>
              <img src={image} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button type="button" onClick={previousHandler}>
          Prev
        </button>
        <button data-cy="next" type="button" onClick={nextHandler}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
