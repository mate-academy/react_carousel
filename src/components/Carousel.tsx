import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  itemWidth: number,
  frameSize: number,
  imageGap: number,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  images, step, itemWidth, frameSize, imageGap, animationDuration,
}) => {
  const [currentPos, setCurrentPos] = useState(0);

  const imagesToLi = (
    images.map((picture, index) => (
      <li
        className="Carousel__item"
        key={picture}
        style={{
          marginRight: `${imageGap}px`,
          width: `${itemWidth}px`,
          height: `${itemWidth}px`,
        }}
      >
        <img
          data-cy="itemId"
          className="Carousel__image"
          src={picture}
          alt={index.toString()}
          width={itemWidth} // REMOVE THIS TO MAKE PICTURES ADAPTIVE DESPITE PROPORTIONS!!!!
        />
      </li>
    ))
  );

  const moveForward = () => {
    if (currentPos + frameSize + step < images.length) {
      setCurrentPos((prevPos) => prevPos + step);
    } else {
      setCurrentPos(images.length - frameSize);
    }
  };

  const moveBackward = () => {
    if (currentPos - step > 0) {
      setCurrentPos((prevPos) => prevPos - step);
    } else {
      setCurrentPos(0);
    }
  };

  return (
    <div className="Carousel" style={{ width: `${(itemWidth + imageGap) * (frameSize) - imageGap}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${currentPos * (itemWidth + imageGap)}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
          width: `${images.length * (itemWidth + imageGap)}px`,
        }}
      >
        {imagesToLi}
      </ul>
      <h1>
        current position is
        {` ${currentPos}`}
      </h1>
      <h5>
        (☝️ X-axis of the left border of 1st image in visible frame)
      </h5>
      <button
        type="button"
        disabled={currentPos === 0}
        onClick={moveBackward}
        className="Carousel__button"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={moveForward}
        disabled={currentPos + frameSize === images.length}
        data-cy="next"
        className="Carousel__button"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
