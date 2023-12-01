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
    width: frameSize * itemWidth,
  };

  const CarouselItemStyle: React.CSSProperties = {

    transform: `translateX(${moveItems}px)`,
    transition: `transform ${animationDuration}ms ease-in-out`,
  };

  const imgStyle: React.CSSProperties = {
    width: itemWidth,
    height: itemWidth,
  };

  const prevItems = () => {
    const tmp = moveItems + step * itemWidth;

    if (tmp > 0) {
      setMoveItems(0);
    } else {
      setMoveItems(tmp);
    }
  };

  const nextItems = () => {
    const max = images.length * itemWidth - itemWidth * frameSize;
    const tmp = moveItems - step * itemWidth;

    if (tmp < -max) {
      setMoveItems(-max);
    } else {
      setMoveItems(tmp);
    }
  };

  return (
    <div className="Carousel" style={CarouselStyle}>
      <ul className="Carousel__list">
        {images.map((img, index) => (
          <li style={CarouselItemStyle} key={img}>
            <img
              src={img}
              alt={(index + 1).toString()}
              style={imgStyle}
            />
          </li>
        ))}
      </ul>

      <button type="button" onClick={prevItems}>Prev</button>
      <button
        type="button"
        onClick={nextItems}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
