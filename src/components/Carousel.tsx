import cn from 'classnames';
import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transformX, setTransformX] = useState(0);
  const [inputWidth, setInputWidth] = useState('130');
  const [frameSize, setFrameSize] = useState('3');
  const [inputAnimation, setInputAnimation] = useState('1000');
  const [step, setStep] = useState('3');
  const [infinite, setInfinite] = useState(false);

  const handlePrevClick = () => {
    if (currentIndex !== undefined && currentIndex > 0) {
      setCurrentIndex(currentIndex - +step);
      setTransformX(transformX - (+step * 10) - +inputWidth * +step);
    }
  };

  const handleNextClick = () => {
    if (currentIndex !== undefined && currentIndex < images.length - 2) {
      setCurrentIndex(currentIndex + +step);
      setTransformX(transformX + (+step * 10) + +inputWidth * +step);
    }

    if (infinite
      && currentIndex !== undefined
      && (currentIndex === images.length - 1
        || currentIndex === images.length - 2)) {
      setTransformX(0);
      setCurrentIndex(0);
    }
  };

  const handleInputChangeWidth = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputWidth(event.target.value);
  };

  const handleFrameSize = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFrameSize(event.target.value);
  };

  const handleAnimation = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputAnimation(event.target.value);
  };

  const handleStep = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStep(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfinite(event.target.checked);
  };

  return (
    <div
      className="Carousel"
      style={{
        width: +frameSize * +inputWidth + (+frameSize * 10),
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${transformX}px)`,
          transition: `transform ${inputAnimation}ms ease-in-out`,
        }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img
              src={image}
              alt={`index-${index}`}
              style={{
                width: +inputWidth,
              }}
            />
          </li>
        ))}
      </ul>
      <div className="container">
        <button
          type="button"
          onClick={handlePrevClick}
          className={cn('button', {
            'button--hide': currentIndex === 0,
          })}
        >
          ←
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNextClick}
          className={cn('button', {
            'button--hide': !infinite && currentIndex >= images.length - 2,
          })}
        >
          →
        </button>
      </div>
      <div>
        Item Width:
        <input
          type="text"
          value={inputWidth}
          onChange={handleInputChangeWidth}
          className="input"
        />
      </div>
      <div>
        Frame Size:
        <input
          type="text"
          value={frameSize}
          onChange={handleFrameSize}
          className="input"
        />
      </div>
      <div>
        Step:
        <input
          type="text"
          value={step}
          onChange={handleStep}
          className="input"
        />
      </div>
      <div>
        AnimationDuration:
        <input
          type="text"
          value={inputAnimation}
          onChange={handleAnimation}
          className="input"
        />
      </div>
      <div>
        Infinite:
        <input
          type="checkbox"
          checked={infinite}
          onChange={handleCheckboxChange}
          className="input"
        />
      </div>
    </div>
  );
};

export default Carousel;
