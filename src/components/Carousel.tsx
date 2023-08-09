import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  source: string[];
};

const Carousel: React.FC<Props> = ({ source }) => {
  const [translate, setTranslate] = useState(0);
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const carouselLength = source.length * itemWidth;
  const maxTranslateRight = -carouselLength + (itemWidth * frameSize);

  const styleVisibleCarousel = {
    transform: `translateX(${translate}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const styleCarousel = {
    width: `${itemWidth * frameSize}px`,
  };

  const styleCarouselImage = {
    width: `${itemWidth}px`,
  };

  function nextButton() {
    const currentTranslate = translate - (itemWidth * step);

    if (currentTranslate > maxTranslateRight) {
      setTranslate(currentTranslate);
    } else {
      setTranslate(0);
    }
  }

  function prevButton() {
    const currentTranslate = translate + (itemWidth * step);

    if (currentTranslate <= 0) {
      setTranslate(currentTranslate);
    } else {
      setTranslate(0);
    }
  }

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={styleCarousel}
      >
        <div
          className="Carousel__visible-list"
          style={styleVisibleCarousel}
        >
          {
            source.map((element: string, index: number) => (
              <li key={element}>
                <img
                  src={element}
                  alt={`${index + 1}`}
                  style={styleCarouselImage}
                />
              </li>
            ))
          }
        </div>
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__buttons--button"
          type="button"
          onClick={() => prevButton()}
        >
          Prev
        </button>

        <button
          className="Carousel__buttons--button"
          type="button"
          data-cy="next"
          onClick={() => nextButton()}
        >
          Next
        </button>

      </div>

      <div className="Carousel__inputs">
        <label
          htmlFor="itemWidth"
          className="Carousel__inputs--label"
        >
          Item width(px):
        </label>
        <input
          className="Carousel__inputs--input"
          id="itemWidth"
          type="number"
          value={itemWidth}
          onChange={
            (event) => setItemWidth(+event.currentTarget.value)
          }
          step={10}
          min={50}
          max={1000}
        />

        <label
          htmlFor="itemFrame"
          className="Carousel__inputs--label"
        >
          Frame size:
        </label>
        <input
          className="Carousel__inputs--input"
          id="itemFrame"
          type="number"
          value={frameSize}
          onChange={
            (event) => setFrameSize(+event.currentTarget.value)
          }
          min={1}
          max={source.length}
        />

        <label
          htmlFor="stepScroll"
          className="Carousel__inputs--label"
        >
          Scroll step:
        </label>
        <input
          className="Carousel__inputs--input"
          id="stepScroll"
          type="number"
          value={step}
          onChange={
            (event) => setStep(+event.currentTarget.value)
          }
          min={1}
          max={source.length}
        />

        <label
          htmlFor="animationDuration"
          className="Carousel__inputs--label"
        >
          Duration(ms):
        </label>
        <input
          className="Carousel__inputs--input"
          id="animationDuration"
          type="number"
          value={animationDuration}
          onChange={
            (event) => setAnimationDuration(+event.currentTarget.value)
          }
          step={500}
          min={500}
          max={10000}
        />
      </div>

    </div>
  );
};

export default Carousel;
