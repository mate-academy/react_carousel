import React, { ChangeEvent, useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
}

const Carousel: React.FC<Props> = ({ images }) => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [scrollSize, setScrollSize] = useState(0);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);

  const widthOfContainer = itemWidth * 10;

  const handleAnimationDuration = (event: ChangeEvent<HTMLInputElement>) => {
    setAnimationDuration(+event.target.value);
  };

  const handleItemWidth = (event: ChangeEvent<HTMLInputElement>) => {
    setItemWidth(+event.target.value);
  };

  const handleFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
    setFrameSize(+event.target.value);
  };

  const handleStepsQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    setStep(+event.target.value);
  };

  const handleScrollRight = () => {
    setIsLeftButtonDisabled(false);
    setScrollSize(current => {
      if ((current + step * itemWidth)
      > (widthOfContainer - frameSize * itemWidth)) {
        setIsRightButtonDisabled(true);

        return widthOfContainer - frameSize * itemWidth;
      }

      return current + step * itemWidth;
    });
  };

  const handleScrollLeft = () => {
    setIsRightButtonDisabled(false);
    setScrollSize(current => {
      if ((current - step * itemWidth) < 0) {
        setIsLeftButtonDisabled(true);

        return 0;
      }

      return current - step * itemWidth;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: widthOfContainer,
            transform: `translateX(${-scrollSize}px)`,
            transition: `transform ${animationDuration}ms ease-out`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              className="Carousel__item"
              style={{
                flex: `0 0 ${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            >
              <img
                className="Carousel__img"
                src={image}
                alt={index.toString()}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__button-wrapper">
          <button
            type="button"
            className="Carousel__button"
            onClick={handleScrollLeft}
            disabled={isLeftButtonDisabled}
          >
            {'<'}
          </button>
          <button
            type="button"
            className="Carousel__button"
            data-cy="next"
            onClick={handleScrollRight}
            disabled={isRightButtonDisabled}
          >
            {'>'}
          </button>
        </div>

        <form className="Carousel__form">
          <label className="Carousel__form-item">
            {'Slid width (px): '}

            <input
              type="text"
              className="Carousel__form-field"
              name="itemWidth"
              placeholder="Slid width"
              value={itemWidth}
              onChange={handleItemWidth}
            />
          </label>

          <label className="Carousel__form-item">
            {'Slides to show: '}

            <input
              type="text"
              className="Carousel__form-field"
              name="frameSize"
              placeholder="Slides to show"
              value={frameSize}
              onChange={handleFrameSize}
            />
          </label>

          <label className="Carousel__form-item">
            {'Slides to scroll: '}

            <input
              type="text"
              className="Carousel__form-field"
              name="step"
              placeholder="Slides to scroll"
              value={step}
              onChange={handleStepsQuantity}
            />
          </label>

          <label className="Carousel__form-item">
            {'Scroll speed (ms): '}

            <input
              type="text"
              className="Carousel__form-field"
              name="animationDuration"
              placeholder="Animation speed"
              value={animationDuration}
              onChange={handleAnimationDuration}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Carousel;
