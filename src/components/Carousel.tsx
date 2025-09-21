import React, { useState, useCallback, useEffect } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images?: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSlides = images.length;
  const maxIndex = Math.max(0, totalSlides - frameSize);

  const canGoPrev = infinite || currentIndex > 0;
  const canGoNext = infinite || currentIndex < maxIndex;

  const goPrev = useCallback(() => {
    if ((!canGoPrev && !infinite) || totalSlides === 0 || isAnimating) return;

    setIsAnimating(true);

    if (infinite && currentIndex === 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prev => Math.max(0, prev - step));
    }

    setTimeout(() => setIsAnimating(false), animationDuration);
  }, [currentIndex, step, infinite, canGoPrev, maxIndex, animationDuration, totalSlides, isAnimating]);

  const goNext = useCallback(() => {
    if ((!canGoNext && !infinite) || totalSlides === 0 || isAnimating) return;

    setIsAnimating(true);

    if (infinite && currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => Math.min(maxIndex, prev + step));
    }

    setTimeout(() => setIsAnimating(false), animationDuration);
  }, [currentIndex, step, infinite, canGoNext, maxIndex, animationDuration, totalSlides, isAnimating]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  if (totalSlides === 0) {
    return (
      <div className="Carousel">
        <div className="Carousel__empty">No images to display</div>
      </div>
    );
  }

  return (
    <div className="Carousel">
      <button
        type="button"
        className="Carousel__button Carousel__button--prev"
        onClick={goPrev}
        disabled={!canGoPrev && !infinite}
        aria-label="Previous slide"
        data-cy="prev"
      >
        ‹
      </button>

      <div
        className="Carousel__viewport"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
        data-cy="viewport"
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: isAnimating ? `transform ${animationDuration}ms ease` : 'none',
            width: `${totalSlides * itemWidth}px`
          }}
          data-cy="carousel-list"
        >
          {images.map((image, index) => (
            <li
              key={index}
              className="Carousel__item"
              style={{
                width: `${itemWidth}px`,
                minWidth: `${itemWidth}px`
              }}
              data-cy={`carousel-item-${index}`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="Carousel__image"
                width={itemWidth}
                height={itemWidth}
                data-cy="carousel-image"
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="Carousel__button Carousel__button--next"
        onClick={goNext}
        disabled={!canGoNext && !infinite}
        aria-label="Next slide"
        data-cy="next"
      >
        ›
      </button>
    </div>
  );
};

export const CarouselPage: React.FC = () => {
  const [settings, setSettings] = useState({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false
  });

  const [tempSettings, setTempSettings] = useState(settings);

  const images = [
    './img/1.png', './img/2.png', './img/3.png', './img/4.png',
    './img/5.png', './img/6.png', './img/7.png', './img/8.png',
    './img/9.png', './img/10.png'
  ];

  const handleApply = () => {
    setSettings({ ...tempSettings });
  };

  const handleInputChange = (field: string, value: number | boolean) => {
    setTempSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="carousel-page">
      <h1 data-cy="title">Carousel</h1>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="itemId">
            Item Width:
          </label>
          <input
            id="itemId"
            type="number"
            value={tempSettings.itemWidth}
            onChange={(e) => handleInputChange('itemWidth', Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label htmlFor="frameId">
            Frame Size:
          </label>
          <input
            id="frameId"
            type="number"
            value={tempSettings.frameSize}
            onChange={(e) => handleInputChange('frameSize', Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label htmlFor="stepId">
            Step:
          </label>
          <input
            id="stepId"
            type="number"
            value={tempSettings.step}
            onChange={(e) => handleInputChange('step', Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label htmlFor="animationId">
            Animation Duration (ms):
          </label>
          <input
            id="animationId"
            type="number"
            value={tempSettings.animationDuration}
            onChange={(e) => handleInputChange('animationDuration', Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={tempSettings.infinite}
              onChange={(e) => handleInputChange('infinite', e.target.checked)}
            />
            Infinite
          </label>
        </div>

        <div className="control-group">
          <button
            type="button"
            onClick={handleApply}
          >
            Apply Settings
          </button>
        </div>
      </div>

      <Carousel
        images={images}
        itemWidth={settings.itemWidth}
        frameSize={settings.frameSize}
        step={settings.step}
        animationDuration={settings.animationDuration}
        infinite={settings.infinite}
      />
    </div>
  );
};

export default CarouselPage;
