import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const repeat = () => {
      if (carouselList + stepState < images.length - stepState) {
        setCarouselList(carouselList + stepState);
      } else if (carouselList < images.length - stepState) {
        setCarouselList(images.length - stepState);
      } else {
        setCarouselList(0);
      }

      if (isInfiniteState) {
        timeoutId = setTimeout(repeat, 3000);
      }
    };

    if (isInfiniteState) {
      timeoutId = setTimeout(repeat, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [carouselList, images.length, isInfiniteState, stepState]);

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
        <button
          className="Carousel__button"
          onClick={() => {
            previous();
            setIsInfiniteState(false);
          }}
          type="button"
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          onClick={() => {
            next();
            setIsInfiniteState(false);
          }}
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
          min={50}
          max={300}
          step={10}
          onChange={e => setItemWidthState(Number(e.target.value))}
          value={itemWidthState}
        />
        <p>Step</p>
        <input
          className="Carousel__input"
          type="number"
          min={0}
          max={images.length}
          step={1}
          onChange={e => {
            if (
              Number(e.target.value) > images.length ||
              Number(e.target.value) < 0
            ) {
              setStepState(1);
            } else {
              setStepState(Number(e.target.value));
            }
          }}
          value={stepState}
        />
        <p>Frame Size</p>
        <input
          className="Carousel__input"
          type="number"
          min={0}
          max={images.length}
          step={1}
          onChange={e => {
            if (
              Number(e.target.value) > images.length ||
              Number(e.target.value) < 0
            ) {
              setFrameSizeState(3);
            } else {
              setFrameSizeState(Number(e.target.value));
            }
          }}
          value={frameSizeState}
        />
        <p>Animation Duration</p>
        <input
          className="Carousel__input"
          type="number"
          min={0}
          step={100}
          onChange={e => setAnimationDurationState(Number(e.target.value))}
          value={animationDurationState}
        />
        <p>Infinite</p>
        <input
          className="Carousel__input"
          checked={isInfiniteState ? true : false}
          type="checkbox"
          onChange={() => setIsInfiniteState(!isInfiniteState)}
        />
      </div>
    </div>
  );
};

export default Carousel;
