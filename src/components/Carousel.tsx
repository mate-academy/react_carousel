import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  itemWidth = 130,
  frameSize = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const size = frameSize * itemWidth;
  const effectiveStep = Math.min(step, images.length);
  const effectiveFrameSize = Math.min(frameSize, images.length);

  return (
    <div className="Carousel" style={{ width: `${size}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${animationDuration}ms ease`,
          transform: `translateX(-${currentIndex * itemWidth}px)`,
        }}
      >
        {images.map((a, i) => (
          <li key={i}>
            <img
              src={a}
              alt={a}
              width={itemWidth}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={!infinite && currentIndex <= 0}
        onClick={e => {
          e.preventDefault();
          if (infinite) {
            if (currentIndex <= 0) {
              setCurrentIndex(images.length - effectiveFrameSize);
            } else {
              setCurrentIndex(currentIndex - effectiveStep);
            }
          } else {
            if (currentIndex - effectiveFrameSize < 0) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(currentIndex - effectiveStep);
            }
          }
        }}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        disabled={
          !infinite && currentIndex + effectiveFrameSize >= images.length
        }
        onClick={e => {
          e.preventDefault();
          if (infinite) {
            if (currentIndex >= images.length - effectiveFrameSize) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(
                Math.min(
                  currentIndex + effectiveStep,
                  images.length - effectiveFrameSize,
                ),
              );
            }
          } else {
            setCurrentIndex(
              Math.min(
                currentIndex + effectiveStep,
                images.length - effectiveFrameSize,
              ),
            );
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
