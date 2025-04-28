import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 500,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSettings, setCurrentSettings] = useState({
    itemWidth,
    frameSize,
    step,
  });

  const totalItems = images.length;
  const maxIndex = infinite
    ? totalItems
    : totalItems - currentSettings.frameSize;

  const handleNext = () => {
    let newIndex = currentIndex + currentSettings.step;

    if (infinite) {
      newIndex = newIndex % totalItems;
    } else {
      newIndex = Math.min(newIndex, totalItems - currentSettings.frameSize);
    }

    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    let newIndex = currentIndex - currentSettings.step;

    if (infinite) {
      newIndex = (newIndex + totalItems) % totalItems;
    } else {
      newIndex = Math.max(newIndex, 0);
    }

    setCurrentIndex(newIndex);
  };

  const updateSetting = (
    key: 'itemWidth' | 'frameSize' | 'step',
    value: number,
  ) => {
    setCurrentSettings(prev => ({
      ...prev,
      [key]: value,
    }));
    setCurrentIndex(0);
  };

  return (
    <div className="carousel">
      <h1 data-cy="title">Carousel</h1>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="itemId">Item Width:</label>
          <input
            id="itemId"
            type="number"
            value={currentSettings.itemWidth}
            onChange={e => updateSetting('itemWidth', Number(e.target.value))}
            data-cy="itemWidthInput"
          />
        </div>

        <div className="control-group">
          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            type="number"
            value={currentSettings.frameSize}
            onChange={e => updateSetting('frameSize', Number(e.target.value))}
            data-cy="frameSizeInput"
          />
        </div>

        <div className="control-group">
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            value={currentSettings.step}
            onChange={e => updateSetting('step', Number(e.target.value))}
            data-cy="stepInput"
          />
        </div>
      </div>

      <div className="carousel-container">
        <button
          className="carousel-button prev"
          onClick={handlePrev}
          disabled={!infinite && currentIndex === 0}
          data-cy="prev"
        >
          Prev
        </button>

        <div
          className="carousel-track"
          style={{
            width: `${currentSettings.frameSize * currentSettings.itemWidth}px`,
          }}
        >
          <ul
            className="carousel-list"
            style={{
              transform: `translateX(-${currentIndex * currentSettings.itemWidth}px)`,
              transition: `transform ${animationDuration}ms ease`,
              width: `${images.length * currentSettings.itemWidth}px`,
            }}
          >
            {images.map((image, index) => (
              <li
                key={index}
                className="carousel-item"
                style={{ width: `${currentSettings.itemWidth}px` }}
              >
                <img src={image} alt={`Slide ${index}`} />
              </li>
            ))}
          </ul>
        </div>
        <button
          className="carousel-button next"
          onClick={handleNext}
          disabled={!infinite && currentIndex >= maxIndex}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
