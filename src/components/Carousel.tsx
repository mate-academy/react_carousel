import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [updatedStep, setUpdatedStep] = useState(step);
  const [updatedFrameSize, setUpdatedFrameSize] = useState(frameSize);
  const [updatedItemWidth, setUpdatedItemWidth] = useState(itemWidth);
  const [updatedAnimationDuration, setUpdatedAnimationDuration] =
    useState(animationDuration);

  return (
    <div
      className="Carousel"
      style={{ width: `${updatedItemWidth * updatedFrameSize}px` }}
    >
      <ul className="Carousel__list">
        {images.map((image: string, index: number) => {
          return (
            <li
              key={image}
              style={{
                transform: `translateX(-${currentSlide * updatedItemWidth}px)`,
                transition: `${updatedAnimationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={String(index + 1)}
                width={`${updatedItemWidth}`}
              />
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => {
          if (currentSlide === 0 && infinite) {
            setCurrentSlide(images.length - updatedFrameSize);

            return;
          }

          if (currentSlide - updatedStep < 0) {
            setCurrentSlide(0);

            return;
          }

          setCurrentSlide(currentSlide - updatedStep);
        }}
        data-cy="prev"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          if (currentSlide >= images.length - updatedFrameSize && infinite) {
            setCurrentSlide(0);

            return;
          }

          if (currentSlide + updatedFrameSize + updatedStep >= images.length) {
            setCurrentSlide(images.length - updatedFrameSize);

            return;
          }

          setCurrentSlide(currentSlide + updatedStep);
        }}
        data-cy="next"
      >
        Next
      </button>

      <label htmlFor="stepId">Step: {updatedStep}</label>
      <input
        type="text"
        name="step"
        onChange={e => setUpdatedStep(Number(e.target.value))}
        placeholder="Step"
        id="stepId"
      />

      <label htmlFor="frameId">Frame Size: {updatedFrameSize}</label>
      <input
        type="text"
        name="frameSize"
        onChange={e => setUpdatedFrameSize(Number(e.target.value))}
        placeholder="Frame size"
        id="frameId"
      />

      <label htmlFor="itemId">Item Width: {updatedItemWidth}px</label>
      <input
        type="text"
        name="itemWidth"
        onChange={e => setUpdatedItemWidth(Number(e.target.value))}
        placeholder="Item width"
        id="itemId"
      />

      <label htmlFor="animationDurationId">
        Animation Duration: {updatedAnimationDuration}ms
      </label>

      <input
        type="text"
        name="fnimationDuration"
        onChange={e => setUpdatedAnimationDuration(Number(e.target.value))}
        placeholder="Animation Duration"
        id="animationDurationId"
      />
    </div>
  );
};

export default Carousel;
