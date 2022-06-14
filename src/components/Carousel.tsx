import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  setParams: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Carousel: React.FC<Props> = (props) => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
    setParams,
  } = props;

  const [corouselPosition, setCorouselPosition] = useState(0);

  function moveLeft() {
    if (infinite || corouselPosition > 0) {
      if (corouselPosition - step < 0) {
        setCorouselPosition(0);
      } else {
        setCorouselPosition(prevState => prevState - step);
      }
    }
  }

  function moveRight() {
    const maxIndex = images.length - frameSize;

    if (corouselPosition + step > maxIndex) {
      setCorouselPosition(maxIndex);
    } else {
      setCorouselPosition(prevState => prevState + step);
    }
  }

  return (
    <div>
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
            transform: `translateX(-${corouselPosition * (100 / frameSize)}%)`,
          }}
        >
          {images.map(image => (
            <li
              key={image}
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img
                src={image}
                alt={image}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__inputContainer">
        <label htmlFor="step">Step</label>
        <input
          value={step}
          onChange={(e) => setParams(e)}
          type="number"
          id="step"
          name="step"
        />
      </div>
      <div className="Carousel__inputContainer">
        <label htmlFor="frameSize">frameSize</label>
        <input
          value={frameSize}
          onChange={(e) => setParams(e)}
          type="number"
          id="frameSize"
          name="frameSize"
        />
      </div>
      <div className="Carousel__inputContainer">
        <label htmlFor="itemWidth">itemWidth</label>
        <input
          value={itemWidth}
          onChange={(e) => setParams(e)}
          type="number"
          id="itemWidth"
          name="itemWidth"
        />
      </div>
      <div className="Carousel__inputContainer">
        <label htmlFor="animationDuration">animationDuration</label>
        <input
          value={animationDuration}
          onChange={(e) => setParams(e)}
          type="number"
          id="animationDuration"
          name="animationDuration"
        />
      </div>
      <button type="button" onClick={moveLeft}>Prev</button>
      <button type="button" onClick={moveRight}>Next</button>
    </div>
  );
};

export default Carousel;
