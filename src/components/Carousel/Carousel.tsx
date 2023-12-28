import React, { useState } from 'react';
import './Carousel.scss';
import { Input } from '../Input/Input';

type Props = {
  images: string[]
};

export const Carousel: React.FC<Props> = ({ images }) => {
  const [transform, setTransform] = useState(0);

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animation, setAnimation] = useState(1000);
  const [isInfinite, setIsInfinite] = useState(false);

  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);

  const frameSizeWidth = itemWidth * frameSize;

  const handleLeft = () => {
    let newTransform = transform + itemWidth * step;

    if (isInfinite) {
      if (newTransform > 0) {
        newTransform = -itemWidth * (images.length - frameSize);
      }

      setRightButtonDisabled(false);
    } else {
      if (newTransform >= 0) {
        newTransform = 0;
        setLeftButtonDisabled(true);
      }

      setRightButtonDisabled(false);
    }

    setTransform(newTransform);
  };

  const handleRight = () => {
    let newTransform = transform - itemWidth * step;

    if (isInfinite) {
      if (newTransform < -itemWidth * (images.length - frameSize)) {
        newTransform = 0;
      }

      setLeftButtonDisabled(false);
    } else {
      if (newTransform <= -itemWidth * (images.length - frameSize)) {
        newTransform = -itemWidth * (images.length - frameSize);
        setRightButtonDisabled(true);
      }

      setLeftButtonDisabled(false);
    }

    setTransform(newTransform);
  };

  const handleCheckboxChange = () => {
    setIsInfinite(prev => {
      if (!prev) {
        setLeftButtonDisabled(false);
        setRightButtonDisabled(false);

        return !prev;
      }

      if (transform === 0) {
        setLeftButtonDisabled(true);
      }

      return !prev;
    });
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: frameSizeWidth }}
      >
        {images.map((image, index) => (
          <li
            className="Carousel__item"
            key={image}
            style={{
              transform: `translateX(${transform}px)`,
              transition: `transform ${animation}ms ease`,
            }}
          >
            <img
              src={image}
              alt={`img-${index + 1}`}
              className="image"
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="button"
          onClick={handleLeft}
          disabled={leftButtonDisabled}
          style={{ cursor: leftButtonDisabled ? 'auto' : 'pointer' }}
        >
          {'<'}
        </button>

        <button
          type="button"
          className="button"
          onClick={handleRight}
          data-cy="next"
          disabled={rightButtonDisabled}
          style={{ cursor: rightButtonDisabled ? 'auto' : 'pointer' }}
        >
          {'>'}
        </button>
      </div>

      <div className="Carousel__form">
        <Input
          label="Item width"
          type="number"
          value={itemWidth}
          onChange={setItemWidth}
          min={100}
          max={180}
          step={5}
        />

        <Input
          label="Frame size"
          type="number"
          value={frameSize}
          onChange={setFrameSize}
          min={1}
          max={6}
          step={1}
        />

        <Input
          label="Step"
          type="number"
          value={step}
          onChange={setStep}
          min={1}
          max={7}
          step={1}
        />

        <Input
          label="Animation"
          type="number"
          value={animation}
          onChange={setAnimation}
          min={500}
          max={2000}
          step={100}
        />

        <label>
          Infinite

          <input
            type="checkbox"
            checked={isInfinite}
            onChange={handleCheckboxChange}
            className="checkbox"
          />
        </label>
      </div>
    </div>
  );
};
