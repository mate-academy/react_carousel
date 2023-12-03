import React, { useState } from 'react';
import './Carousel.scss';

export type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC <CarouselProps> = ({
  images, step, frameSize, itemWidth, animationDuration,
}) => {
  const [moveItems, setMoveItems] = useState<number>(0);

  const CarouselStyle: React.CSSProperties = {
    width: frameSize * itemWidth - 1,
  };

  const CarouselItemStyle: React.CSSProperties = {
    transform: `translateX(${moveItems}%)`,
    transition: `transform ${animationDuration}ms ease-in-out`,
  };

  const prevItems = () => {
    const tmp = moveItems + step * 100;

    if (tmp > 0) {
      setMoveItems(0);
    } else {
      setMoveItems(tmp);
    }
  };

  const nextItems = () => {
    const max = images.length * 100 - 100 * frameSize;
    const tmp = moveItems - step * 100;

    if (tmp < -max) {
      setMoveItems(-max);
    } else {
      setMoveItems(tmp);
    }
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={CarouselStyle}>
        {images.map((img, index) => (
          <li style={CarouselItemStyle} key={img}>
            <img
              src={img}
              alt={(index + 1).toString()}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button type="button" onClick={prevItems}>Prev</button>
        <button
          type="button"
          onClick={nextItems}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
