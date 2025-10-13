import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  frameSize: number;
  step: number;
  animationDuration: number;
  itemWidth: number;
  handleInputItemSize: (input: number) => void;
}

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  step,
  animationDuration,
  itemWidth,
  handleInputItemSize,
}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const horizontalSpace = 10;

  const handleClkForward = () => {
    setCurrIndex(prev =>
      prev + step > images.length - step ? images.length - step : prev + step,
    );
  };

  const handleClkBackward = () => {
    setCurrIndex(prev => (prev - step < 0 ? 0 : prev - step));
  };

  return (
    <div
      className="Carousel"
      style={{
        width: itemWidth * frameSize + frameSize * horizontalSpace * 2,
      }}
    >
      <div className="Carousel__window">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currIndex * (100 / frameSize)}%)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, i) => {
            return (
              <li key={image}>
                <img
                  style={{
                    margin: `${horizontalSpace}px`,
                    width: itemWidth,
                  }}
                  src={`${image}`}
                  alt={(i + 1).toString()}
                  className="Carousel__list__item"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button type="button" onClick={handleClkBackward}>
        Prev
      </button>
      <button type="button" onClick={handleClkForward}>
        Next
      </button>

      <input
        name="item_size"
        type="text"
        value={itemWidth}
        onChange={event => handleInputItemSize(+event.target.value)}
      />
    </div>
  );
};

export default Carousel;
