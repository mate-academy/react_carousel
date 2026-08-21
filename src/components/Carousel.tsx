import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [translateModifier, setTranslateModifier] = useState(0);

  const maxStep = Math.ceil(images.length / step) - 1;

  const styleOfList = {
    '--animation-duration': `${animationDuration}ms`,
    '--translate-x': `${currentStep * itemWidth * step * -1 + translateModifier}px`,
  } as React.CSSProperties;

  function moveCarouselPrev() {
    if (currentStep <= 0 && !infinite) {
      return;
    }

    if (currentStep === 1) {
      setTranslateModifier(0);
    }

    if (infinite && currentStep === 0) {
      const diff = (step - (images.length % step)) * itemWidth;
      setTranslateModifier(diff);
      setCurrentStep(maxStep);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function moveCarouselNext() {
    if (currentStep === maxStep && !infinite) {
      return;
    }

    
    if (currentStep === maxStep - 1) {
      const diff = (step - (images.length % step)) * itemWidth;
      
      setTranslateModifier(diff);
    }
    
    if (currentStep === maxStep && infinite) {
      setCurrentStep(0);
      setTranslateModifier(0);
    } else {
      setCurrentStep(prev => prev + 1);
    }
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
          disabled={currentStep === 0 && !infinite}
          aria-disabled={currentStep === 0 && !infinite}
          onClick={moveCarouselPrev}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          disabled={currentStep === maxStep && !infinite}
          aria-disabled={currentStep === maxStep && !infinite}
          onClick={moveCarouselNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
