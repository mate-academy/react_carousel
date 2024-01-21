import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite?: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [stepNum, setStepNum] = useState(step);
  const [frameSizeNum, setFrameSizeNum] = useState(frameSize);
  const [itemWidthNum, setItemWidthNum] = useState(itemWidth);
  const [durationNum, setDurationNum] = useState(animationDuration);
  const [infiniteType, setInifiniteType] = useState(infinite);

  window.addEventListener('load', () => {
    (document.querySelectorAll('.Carousel__btn')[0] as HTMLButtonElement)
      .disabled = true;
  });

  return (
    <>
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidthNum * frameSizeNum}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={image}
              style={{
                transition: `all ${durationNum}ms linear`,
                transform: `translateX(${
                  currentImg <= images.length - frameSizeNum - 1
                    ? -itemWidthNum * currentImg
                    : -itemWidthNum * (images.length - frameSizeNum)
                }px)`,
              }}
            >
              <img
                src={`${image}`}
                alt={`${index + 1}`}
                style={{
                  width: `${itemWidthNum}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <ul className="Carousel__group">
          <button
            type="button"
            className="Carousel__btn"
            onClick={() => {
              const btnPrev = document.querySelectorAll('.Carousel__btn')[0] as
                HTMLButtonElement;
              const btnNext = document.querySelectorAll('.Carousel__btn')[1] as
                HTMLButtonElement;

              btnPrev.disabled = currentImg - stepNum <= 0
                && !infiniteType;
              btnNext.disabled = false;

              return currentImg > 0
                ? setCurrentImg(prevImg => prevImg - stepNum)
                : infiniteType && setCurrentImg(images.length);
            }}
          >
            Prev
          </button>
          <button
            type="button"
            className="Carousel__btn"
            onClick={() => {
              const btnPrev = document.querySelectorAll('.Carousel__btn')[0] as
                HTMLButtonElement;
              const btnNext = document.querySelectorAll('.Carousel__btn')[1] as
                HTMLButtonElement;

              btnNext.disabled = currentImg + stepNum >= (images.length - 1)
                && !infiniteType;
              btnPrev.disabled = false;

              return currentImg + stepNum <= (images.length - 1)
                ? setCurrentImg(prevImg => prevImg + stepNum)
                : infiniteType && setCurrentImg(0);
            }}
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

        <div className="Carousel__item">
          <label htmlFor="infinite">Is infinite:</label>
          <input
            type="checkbox"
            className="Carousel__inp"
            name="infinite"
            defaultChecked={infinite}
            onChange={(e) => {
              (document.querySelectorAll('.Carousel__btn')[0] as
                HTMLButtonElement).disabled = false;
              (document.querySelectorAll('.Carousel__btn')[1] as
                HTMLButtonElement).disabled = false;
              setInifiniteType(e.target.checked);
            }}
          />
        </div>
      </ul>
    </>
  );
};

export default Carousel;
