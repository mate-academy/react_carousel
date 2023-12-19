import React, { useState, useRef, useEffect } from 'react';
import './Carousel.scss';

interface Props{
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = (
  {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
  },
) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setStep] = useState(step);
  const [currentframeSize, setFrame] = useState(frameSize);
  const [currentitemWidth, setWidth] = useState(itemWidth);
  const [currentanimationDuration, setDuration] = useState(animationDuration);

  const handleNext = () => {
    const newIndex = currentIndex + currentStep;

    setCurrentIndex(Math.min(newIndex, images.length - currentframeSize));
  };

  const handlePrevious = () => {
    const newIndex = currentIndex - currentStep;

    setCurrentIndex(Math.max(newIndex, 0));
  };

  useEffect(() => {
    const container = containerRef.current as HTMLDivElement | null;

    if (container) {
      container.style.transition = `transform ${currentanimationDuration}ms ease-in-out`;
      container.style.transform = `translateX(-${currentIndex * currentitemWidth}px)`;
    }
  }, [currentIndex, currentitemWidth, currentanimationDuration, currentStep]);

  return (
    <>
      <div
        className="Carousel"
        style={
          {
            width: `${currentframeSize * currentitemWidth}px`,
          }
        }
      >
        <ul
          className="Carousel__list"
          ref={containerRef}
          style={
            {
              width: `${images.length * currentitemWidth}px`,
              transform: `translateX(-${(currentitemWidth * currentStep)}px)`,
              transition: `transform ${currentanimationDuration}ms ease-in-out`,
            }
          }
        >
          {
            images.map((url, index) => (
              <li
                className="Carousel__item"
                key={+index}
                style={{
                  width: `${currentitemWidth}px`,
                  height: `${currentitemWidth}px`,
                }}
              >
                <img
                  className="Carousel__image"
                  key={+index}
                  data-cy="itemId"
                  src={url}
                  alt={`${index}`}
                  width={currentitemWidth}
                  height={currentitemWidth}
                />
              </li>
            ))
          }
        </ul>

        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={currentIndex + currentframeSize >= images.length}
        >
          Next
        </button>
      </div>

      <label htmlFor="itemId">
        Item Width:
        <input
          type="number"
          id="itemId"
          value={currentitemWidth}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </label>
      <label htmlFor="frameId">
        Frame Size:
        <input
          type="number"
          id="frameId"
          value={currentframeSize}
          onChange={(e) => setFrame(Number(e.target.value))}
        />
      </label>
      <label htmlFor="stepId">
        Step:
        <input
          type="number"
          id="stepId"
          value={currentStep}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </label>
      <label>
        Animation Duration:
        <input
          type="number"
          value={currentanimationDuration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </label>
    </>
  );
};

export default Carousel;
