import React, { useEffect, useState } from 'react';
import './Carousel.scss';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
}

const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gap = 10;
  const frameWidth = frameSize * itemWidth + (frameSize - 1) * gap;

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + step, images.length - frameSize));
  };

  const handlePrevious = () => {
    setCurrentIndex(Math.max(currentIndex - step, 0));
  };

  const commonButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    className: 'button',
    type: 'button',
  };

  const nextButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    ...commonButtonProps,
    onClick: handleNext,
    disabled: currentIndex >= images.length - frameSize,
  };

  const previousButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    ...commonButtonProps,
    onClick: handlePrevious,
    disabled: currentIndex === 0,
  };

  const containerStyle = {
    transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
    transition: `transform ${animationDuration}ms ease-out`,
    gap: `${gap}px`,
    width: `${frameWidth}px`,
  };

  useEffect(() => {
    const maxIndex = images.length - frameSize;

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [frameSize, images.length, currentIndex]);

  return (
    <div className="carousel">
      <button {...previousButtonProps}>Prev</button>

      <div className="carousel__container" style={{ width: `${frameWidth}px` }}>
        <ul className="carousel__list" style={containerStyle}>
          {images.map((image, i) => (
            <li key={i}>
              <img
                src={image}
                alt={`image ${i}`}
                className="carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button {...nextButtonProps}>Next</button>
    </div>
  );
};

export default Carousel;
