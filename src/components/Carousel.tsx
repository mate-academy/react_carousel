import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  animationDuration?: number;
  step?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(step);
  const [currentItemWidth, setCurrentItemWidth] = useState(itemWidth);
  const [currentFrameSize, setCurrentFrameSize] = useState(frameSize);

  const ButtonNext = () => {
    if (infinite || currentIndex + currentStep < images.length) {
      setCurrentIndex(prev =>
        infinite
          ? (prev + currentStep) % images.length
          : Math.min(prev + currentStep, images.length - currentFrameSize),
      );
    }
  };

  const ButtonPrev = () => {
    if (infinite || currentIndex > 0) {
      setCurrentIndex(prev =>
        infinite
          ? (prev - currentStep + images.length) % images.length
          : Math.max(prev - currentStep, 0),
      );
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          overflow: 'hidden',
          width: `${currentItemWidth * currentFrameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms ease-in-out`,
            transform: `translateX(-${currentIndex * currentItemWidth}px)`,
            display: 'flex',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                width={currentItemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <label htmlFor="stepId">Step</label>
      <input
        id="stepId"
        type="number"
        value={currentStep}
        onChange={e => setCurrentStep(Math.max(1, Number(e.target.value)))}
        data-cy="stepId"
      />

      <label htmlFor="itemId">Item Width</label>
      <input
        id="itemId"
        type="number"
        value={currentItemWidth}
        onChange={e => setCurrentItemWidth(Math.max(1, Number(e.target.value)))}
        data-cy="itemId"
      />

      <label htmlFor="frameId">Frame Size</label>
      <input
        id="frameId"
        type="number"
        value={currentFrameSize}
        onChange={e => setCurrentFrameSize(Math.max(1, Number(e.target.value)))}
        data-cy="frameId"
      />

      <button
        type="button"
        onClick={ButtonPrev}
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={ButtonNext}
        disabled={!infinite && currentIndex + currentFrameSize >= images.length}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
