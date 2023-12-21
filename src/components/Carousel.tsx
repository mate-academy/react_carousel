import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [position, setPosition] = useState(0);
  const frameWidth = frameSize * itemWidth;

  const moveRight = () => {
    setPosition((currentPosition) => {
      const newPosittion = currentPosition - (step * itemWidth);

      return newPosittion;
    });
    // if (position !== -widthList
    //     && widthList - Math.abs(position) >= widthFrame) {
    //   setPosition(
    //     currentPosition => currentPosition - chooseItemWidth * chooseStep,
    //   );
    // } else {
    //   setPosition(-widthList);
    // }
  };

  const moveLeft = () => {
    setPosition((currentPosition) => {
      if (currentPosition !== 0) {
        const newPosittion = currentPosition + (step * itemWidth);

        return newPosittion;
      }

      return currentPosition;
    });
  //   if (position !== 0 && Math.abs(position) >= widthFrame) {
  //     setPosition(
  //       currentPosition => currentPosition + chooseItemWidth * chooseStep,
  //     );
  //   } else {
  //     setPosition(0);
  //   }
  };

  const items = images.map(img => (
    <li
      className="Carousel__list-img"
      key={img}
      style={{ listStyle: 'none' }}
    >
      <img
        src={img}
        alt={img}
        style={{
          width: `${itemWidth}px`,
          transition: `width ${animationDuration}ms ease`,
        }}
      />
    </li>
  ));

  return (
    <div
      className="Carousel"
      style={{
        transition: `all ${animationDuration}ms ease`,
      }}
    >
      <div
        className="Carousel__list-wrapper"
        style={{
          width: `${frameWidth}px`,
          height: `${itemWidth}px`,
          transition: `all ${animationDuration}ms ease`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            left: `${position}px`,
            transition: `left ${animationDuration}ms ease`,
          }}
        >
          {items}
        </ul>
      </div>

      <div className="Carousel__button-wrapper">
        <button
          onClick={moveLeft}
          className="Carousel__button"
          data-cy="prev"
          type="button"
        >
          Prev
        </button>

        <button
          onClick={moveRight}
          className="Carousel__button"
          data-cy="next"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
