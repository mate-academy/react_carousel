import React, { useState } from 'react';
import classNames from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
}

const Carousel: React.FC<Props> = ({ images }) => {
  const [translate, setTranslate] = useState(0);
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const styleVisibleCarousel = {
    transform: `translateX(${translate}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const styleCarousel = {
    width: `${itemWidth + frameSize}px`,
  };

  const styleCarouselImage = {
    width: `${itemWidth}px`,
  };

  const carouselLength = images.length * itemWidth;
  const maxTranslateRight = -carouselLength + (itemWidth * frameSize);

  function handleNextImage() {
    const newTranslate = translate - (itemWidth * step);

    if (newTranslate > maxTranslateRight) {
      setTranslate(newTranslate);
    } else {
      setTranslate(maxTranslateRight);
    }
  }

  function handlePrevImage() {
    const newTranslate = translate + (itemWidth * step);

    if (newTranslate <= 0) {
      setTranslate(newTranslate);
    } else {
      setTranslate(0);
    }
  }

  return (
    <div className="Carousel">
      <div className="Carousel__inputs">
        <input
          type="number"
          value={itemWidth}
          onChange={(event) => setStep(+event.currentTarget.value)}
          placeholder="Write a number of step here..."
        />

        <input
          type="number"
          value={frameSize}
          onChange={(event) => setFrameSize(+event.currentTarget.value)}
          placeholder="Write a size of frame here..."
          min={1}
          max={images.length}
        />

        <input
          type="number"
          value={step}
          onChange={(event) => setItemWidth(+event.currentTarget.value)}
          placeholder="Write a size of image here..."
          min={1}
          max={images.length}
        />

        <input
          type="number"
          value={animationDuration}
          onChange={(event) => setAnimationDuration(+event.currentTarget.value)}
          placeholder="Write a duration of animation here..."
        />
      </div>

      <ul
        className="Carousel__list"
        style={styleCarousel}
      >
        <div
          className="Carousel__visibleList"
          style={styleVisibleCarousel}
        >
          {images.map((image: string, index: number) => (
            <li key={image}>
              <img
                src={image}
                alt={(index + 1).toString()}
                style={styleCarouselImage}
              />
            </li>
          ))}
        </div>
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={() => handlePrevImage()}
          className={classNames(
            'Carousel__button',
            {
              'Carousel__button--disabled': translate === 0,
            },
          )}
        >
          Prev
        </button>

        <button
          type="button"
          onClick={() => handleNextImage()}
          className={classNames(
            'Carousel__button',
            {
              'Carousel__button--disabled': translate === maxTranslateRight,
            },
          )}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
