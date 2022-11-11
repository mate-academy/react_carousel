import React, { ChangeEvent, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import classNames from 'classnames';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  animationDuration,
  step,
  frameSize,
  infinite = false,
}) => {
  const [possition, setPossition] = useState(0);
  const [useItemWidth, setUseItemWidth] = useState(itemWidth);
  const [
    useAnimationDuration,
    setUseAnimationDuration,
  ] = useState(animationDuration);
  const [useStep, setUseStep] = useState(step);
  const [useFrameSize, setUseFrameSize] = useState(frameSize);

  const slideClick = (direction: string) => {
    if (infinite) {
      return;
    }

    let nextPossition = possition;

    switch (direction) {
      case ('next'):
        nextPossition += useStep;
        if ((images.length - useFrameSize) < nextPossition) {
          nextPossition = images.length - useFrameSize;
        }

        break;
      case ('prev'):
        nextPossition -= useStep;
        if (nextPossition < 0) {
          nextPossition = 0;
        }

        break;
      default:
        break;
    }

    setPossition(nextPossition);
  };

  const propsSlider: string[] = [
    'itemWidth',
    'animationDuration',
    'frameSize',
    'step',
  ];

  const addsizeSlider = (
    e: ChangeEvent<HTMLInputElement>,
    property: string,
  ) => {
    switch (property) {
      case 'itemWidth':
        setUseItemWidth(+e.currentTarget.value);
        break;
      case 'animationDuration':
        setUseAnimationDuration(+e.currentTarget.value);
        break;
      case 'frameSize':
        setUseFrameSize(+e.currentTarget.value);
        break;
      case 'step':
        setUseStep(+e.currentTarget.value);

        break;
      default:
        break;
    }
  };

  return (
    <div
      className="carousel"
      style={{
        width: `${useItemWidth * images.length}px`,
      }}
    >
      <ul
        className="carousel__list"
        style={{
          width: `${useFrameSize * useItemWidth}px`,
        }}
      >
        {images.map((image, index) => (
          <li
            className="carousel__item"
            key={image}
            style={{
              width: `${useItemWidth}px`,
              height: `${useItemWidth}px`,
              transition: `transform ${useAnimationDuration}ms`,
              transform: `translateX(-${possition * useItemWidth}px)`,
            }}
          >
            <img
              src={image}
              alt={`${index}`}
              id={image}
              style={{
                width: `${useItemWidth}px`,
                height: `${useItemWidth}px`,
              }}
            />
          </li>
        ))}
      </ul>

      <button
        className={classNames(
          'carousel__button carousel__button--prev',
          { 'carousel__button--disabled': possition <= 0 },
        )}
        type="button"
        onClick={() => slideClick('prev')}
      >
        <FaChevronLeft />
      </button>
      <button
        className={classNames(
          'carousel__button carousel__button--next',
          { 'carousel__button--disabled': possition >= 10 - useStep },
        )}
        type="button"
        data-cy="next"
        onClick={() => slideClick('next')}
      >
        <FaChevronRight />
      </button>
      <div className="carousel__container-inputs">
        {propsSlider.map((prop) => (
          <label
            htmlFor={`${prop.slice(0, 4)}Id`}
            key={prop}
          >
            {prop}
            <input
              type="number"
              id={prop}
              onChange={(e) => addsizeSlider(e, prop)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
