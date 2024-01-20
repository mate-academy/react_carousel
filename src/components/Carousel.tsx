import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  // infinite?: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  // infinite = false,
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [stepNum, setStepNum] = useState(step);
  const [frameSizeNum, setFrameSizeNum] = useState(frameSize);
  const [itemWidthNum, setItemWidthNum] = useState(itemWidth);
  const [durationNum, setDurationNum] = useState(animationDuration);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImg(prevImg => (
        prevImg < images.length - stepNum ? prevImg + stepNum : 1
      ));
    }, durationNum);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      <div className="Carousel">
        <ul className="Carousel__list">
          {images.map((image, index) => (
            (index > currentImg - 1 && index < frameSizeNum + currentImg)
            && (
              <li>
                <img
                  src={`${image}`}
                  alt={`${currentImg}`}
                  style={{
                    width: itemWidthNum,
                    height: itemWidthNum,
                  }}
                />
              </li>
            )))}
        </ul>

        <ul className="Carousel__list">
          <button
            type="button"
            className="Carousel__btn"
            onClick={
              () => currentImg > 0
                && setCurrentImg(prevImg => prevImg - stepNum)
            }
          >
            Prev
          </button>
          <button
            type="button"
            className="Carousel__btn"
            onClick={
              () => currentImg + stepNum < (images.length - 1)
                && setCurrentImg(prevImg => prevImg + stepNum)
            }
            data-cy="next"
          >
            Next
          </button>
        </ul>
      </div>

      <ul className="Carousel__options">
        <div className="Carousel__item">
          <label htmlFor="step">Step:</label>
          <input
            type="number"
            className="Carousel__inp"
            name="step"
            defaultValue={step}
            min={1}
            max={10}
            onChange={(e) => setStepNum(+e.target.value)}
          />
        </div>

        <div className="Carousel__item">
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
        </div>

        <div className="Carousel__item">
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
        </div>

        <div className="Carousel__item">
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
        </div>
      </ul>
    </>
  );
};

export default Carousel;
