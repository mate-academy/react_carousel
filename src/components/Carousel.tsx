import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  // infinite = false
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [translateModifier, setTranslateModifier] = useState(0);

  const maxStep = Math.ceil(images.length / step) - 1;

  const styleOfList = {
    '--animation-duration': `${animationDuration}ms`,
    '--translate-x': `${currentStep * itemWidth * step * -1 + translateModifier}px`,
  } as React.CSSProperties;

  function moveCarouselPrev() {
    if (currentStep <= 0) {
      return;
    }

    if (currentStep === 1) {
      setTranslateModifier(0);
    }

    setCurrentStep(prev => prev - 1);
  }

  function moveCarouselNext() {
    if (currentStep === maxStep) {
      return;
    }

    if (currentStep === maxStep - 1) {
      const diff = (step - (images.length % step)) * itemWidth;

      setTranslateModifier(diff);
    }

    setCurrentStep(prev => prev + 1);
  }

  return (
    <>
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
        <ul className="Carousel__list" style={styleOfList}>
          {images.map((img, i) => {
            return (
              <li className="Carousel__item" key={img}>
                <img width={itemWidth} src={img} alt={i.toString()} />
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          disabled={currentStep === 0}
          aria-disabled={currentStep === 0}
          onClick={moveCarouselPrev}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          disabled={currentStep === maxStep}
          aria-disabled={currentStep === maxStep}
          onClick={moveCarouselNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
