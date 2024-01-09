import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step?: number,
  frameSize?: number,
  itemWidth?: number,
  animationDuration?: number,
  // eslint-disable-next-line
  infinite?: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step = 1,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}) => {
  const [currentImg, setCurrentImg] = useState(1);
  const [stepNum, setStepNum] = useState(step);
  const [frameSizeNum, setFrameSizeNum] = useState(frameSize);
  const [itemWidthNum, setItemWidthNum] = useState(itemWidth);
  const [durationNum, setDurationNum] = useState(animationDuration);

  // eslint-disable-next-line
  console.log(frameSizeNum, itemWidthNum, durationNum);

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {images.find((_images, index) => index === currentImg) && (
          <li>
            <img
              src={`${images[currentImg]}`}
              alt={`${currentImg}`}
              width={itemWidth}
            />
          </li>
        )}
      </ul>

      <ul className="Carousel__list">
        <button
          type="button"
          className="Carousel__btn"
          onClick={() => currentImg > 1 && setCurrentImg(currentImg - step)}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__btn"
          onClick={
            () => currentImg < (images.length - 1)
              && setCurrentImg(currentImg + step)
          }
          data-cy="next"
        >
          Next
        </button>
      </ul>

      <ul className="Carousel__options">
        <label htmlFor="step">Step:</label>
        <input
          type="number"
          className="Carousel__inp"
          name="step"
          defaultValue={stepNum}
          min={1}
          max={10}
          onChange={(e) => setStepNum(+e.target.value)}
        />

        <label htmlFor="frame-size">Frame size:</label>
        <input
          type="number"
          className="Carousel__inp"
          name="frame-size"
          defaultValue={frameSize}
          min={1}
          max={10}
          onChange={(e) => setFrameSizeNum(+e.target.value)}
        />

        <label htmlFor="width">Item width:</label>
        <input
          type="number"
          className="Carousel__inp"
          name="width"
          defaultValue={itemWidth}
          min={50}
          max={200}
          onChange={(e) => setItemWidthNum(+e.target.value)}
        />

        <label htmlFor="duration">Animation duration:</label>
        <input
          type="number"
          className="Carousel__inp"
          name="duration"
          defaultValue={animationDuration}
          min={100}
          max={10000}
          step={100}
          onChange={(e) => setDurationNum(+e.target.value)}
        />
      </ul>
    </div>
  );
};

export default Carousel;
