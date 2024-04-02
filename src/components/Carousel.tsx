import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [carouselList, setCarouselList] = useState(0);
  const [stepState, setStepState] = useState(step);
  const [frameSizeState, setFrameSizeState] = useState(frameSize);
  const [itemWidthState, setItemWidthState] = useState(itemWidth);
  const [animationDurationState, setAnimationDurationState] =
    useState(animationDuration);
  const [isInfiniteState, setIsInfiniteState] = useState(infinite);

  const previous = () =>
    -carouselList + stepState < 0
      ? setCarouselList(carouselList - stepState)
      : setCarouselList(0);

  const next = () =>
    carouselList + stepState < images.length - stepState
      ? setCarouselList(carouselList + stepState)
      : setCarouselList(images.length - stepState);

  const reapet = () => {
    if (carouselList + stepState < images.length - stepState) {
      setCarouselList(carouselList + stepState);
    } else if (carouselList < images.length - stepState) {
      setCarouselList(images.length - stepState);
    } else {
      setCarouselList(0);
    }
  };

  let infiniteInterval: NodeJS.Timer;

  if (isInfiniteState) {
    infiniteInterval = setInterval(reapet, 3000);
  }

  return (
    <div style={{ width: itemWidthState * images.length }} className="Carousel">
      <div
        style={{ width: itemWidthState * frameSizeState }}
        className="Carousel__visible"
      >
        <ul
          style={{
            height: itemWidthState,
            right: carouselList * itemWidthState,
            transition: `all ${animationDurationState}ms`,
          }}
          className="Carousel__list"
        >
          {images.map((image, index) => (
            <img
              key={`${index}-${image}`}
              src={image}
              alt={String(index)}
            ></img>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button className="Carousel__button" onClick={previous} type="button">
          Prev
        </button>
        <button
          className="Carousel__button"
          onClick={next}
          data-cy="next"
          type="button"
        >
          Next
        </button>
      </div>
      <div className="Carousel__input-box">
        <p>Item Width</p>
        <input
          className="Carousel__input"
          type="number"
          onChange={e => setItemWidthState(Number(e.target.value))}
          value={itemWidthState}
        />
        <p>Step</p>
        <input
          className="Carousel__input"
          type="number"
          onChange={e => setStepState(Number(e.target.value))}
          value={step}
        />
        <p>Frame Size</p>
        <input
          className="Carousel__input"
          min={50}
          max={300}
          type="number"
          onChange={e => setFrameSizeState(Number(e.target.value))}
          value={frameSizeState}
        />
        <p>Animation Duration</p>
        <input
          className="Carousel__input"
          type="number"
          onChange={e => setAnimationDurationState(Number(e.target.value))}
          value={animationDurationState}
        />
        <p>Infinite</p>
        <input
          className="Carousel__input"
          type="checkbox"
          onChange={() => {
            setIsInfiniteState(!isInfiniteState);
            if (!isInfiniteState) {
              clearInterval(infiniteInterval);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Carousel;
