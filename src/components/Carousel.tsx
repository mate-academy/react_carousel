import React, { useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC<{
  images: string[];
  animationDuration: number;
  step: number;
  frameSize: number;
  itemWidth: number;
}> = ({
  images,
  animationDuration = 1000,
  itemWidth = 130,
  step = 3,
  frameSize = 3,
}) => {
  const [translate, setTranslate] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const lengthOfList = images.length * itemWidth;
  const lengthOfWrap = frameSize * itemWidth;
  const stepLength = step * itemWidth;
  const maxFullSteps = Math.floor(lengthOfList / stepLength);

  const showNext = () => {
    if (currentStep < maxFullSteps) {
      setTranslate(prevTranslate => prevTranslate - stepLength);
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === maxFullSteps) {
      if (maxFullSteps * stepLength !== lengthOfList) {
        setTranslate(
          prevTranslate =>
            prevTranslate - (lengthOfList - maxFullSteps * stepLength),
        );
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const showPrevious = () => {
    if (currentStep > maxFullSteps) {
      setTranslate(
        prevTranslate =>
          prevTranslate + (lengthOfList - maxFullSteps * stepLength),
      );
      setCurrentStep(prev => prev - 1);
    } else if (currentStep > 1) {
      setTranslate(prevTranslate => prevTranslate + stepLength);
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="Carousel" style={{ width: `${lengthOfList}px` }}>
      <div className="Carousel__wrap" style={{ width: `${lengthOfWrap}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translate}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map(item => (
            <li
              className="list__item"
              key={images.indexOf(item)}
              style={{
                width: `${lengthOfWrap}px`,
                height: `${lengthOfWrap}px`,
              }}
            >
              <img src={item} alt={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="cover">
        <button type="button" onClick={() => showPrevious()}>
          Prev
        </button>
        <button type="button" onClick={() => showNext()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
