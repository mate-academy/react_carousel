import React, { useState } from 'react';
import './Carousel.scss';
import CarouselSettings from './CarouselSettings/CarouselSettings';
import RightArrow from '../arrows/arrow-right.svg';
import LeftArrow from '../arrows/arrow-left.svg';

type Props = {
  images:string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
};

const Carousel: React.FC<Props> = ({
  images, itemWidth, frameSize, step, animationDuration,
}) => {
  const [offset, setOffset] = useState(0);
  const [itemWidthState, setItemWidthState] = useState(itemWidth || 130);
  const [frameSizeState, setFrameSizeState] = useState(frameSize || 3);
  const [stepState, setStepState] = useState(step || 3);
  const [
    animationDurationState,
    setAnimationDurationState,
  ] = useState(animationDuration || 1000);

  const maxItemsWidth = images.length * itemWidthState * -1;

  function prevBTN() {
    if (offset < 0) {
      setOffset((prev) => {
        const newOffset = prev + itemWidthState * stepState;

        return newOffset <= 0 ? newOffset : 0;
      });
    }
  }

  function nextBTN() {
    if (offset > (itemWidthState * frameSizeState)
     - (images.length * itemWidthState)) {
      setOffset((prev) => {
        const newOffset = prev - itemWidthState * stepState;
        const offsetLimit = maxItemsWidth + itemWidthState * frameSizeState;

        return newOffset >= offsetLimit ? newOffset : offsetLimit;
      });
    }
  }

  const carouselStyle = {
    width: `${frameSizeState * itemWidthState}px`,
  };

  return (
    <>
      <div className="carousel" style={carouselStyle}>
        <ul className="carouselList" style={{ width: `${frameSizeState * itemWidthState}px` }}>
          {images.map((img) => {
            const itemStyle = {
              left: `${offset}px`,
              transition: `all ${animationDurationState}ms ease-in-out`,
            };

            return (
              <li
                className="carouselItem"
                key={img}
                style={itemStyle}
              >
                <img src={img} alt={img} width={itemWidthState} />
              </li>
            );
          })}
        </ul>

        <button
          className="carouselBtn carouselBtn--prev"
          type="button"
          onClick={prevBTN}
          disabled={offset === 0}
        >
          <img src={LeftArrow} alt="next" width="50px" height="50px" />
        </button>
        <button
          className="carouselBtn carouselBtn--next"
          type="button"
          onClick={nextBTN}
          data-cy="next"
          disabled={offset === maxItemsWidth + itemWidthState * frameSizeState}
        >
          <img src={RightArrow} alt="next" width="50px" height="50px" />
        </button>
      </div>

      <CarouselSettings
        itemWidthState={itemWidthState}
        setItemWidthState={setItemWidthState}
        frameSizeState={frameSizeState}
        setFrameSizeState={setFrameSizeState}
        stepState={stepState}
        setStepState={setStepState}
        animationDurationState={animationDurationState}
        setAnimationDurationState={setAnimationDurationState}
      />
    </>
  );
};

export default Carousel;
