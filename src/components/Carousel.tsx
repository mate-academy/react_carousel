import React, { useState, useRef, useEffect } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[]; // теперь обязателен
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  gap?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  gap = 10,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepValue, setStepValue] = useState(step);
  const [itemWidthValue, setItemWidthValue] = useState(itemWidth);
  const [frameSizeValue, setFrameSizeValue] = useState(frameSize);
  const [animationDurationValue, setAnimationDuration] =
    useState(animationDuration);
  const [infiniteValue, setInfiniteValue] = useState(infinite);

  const imgRefs = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    imgRefs.current.forEach(img => {
      if (img) {
        img.setAttribute('width', `${itemWidthValue}`);
        img.setAttribute('height', `${itemWidthValue}`);
      }
    });
  }, [itemWidthValue]);

  const maxIndex = images.length - frameSizeValue;

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const candidate = prev - stepValue;

      return infiniteValue
        ? candidate < 0
          ? maxIndex
          : candidate
        : Math.max(candidate, 0);
    });
  };

  const handleNext = () => {
    setCurrentIndex(prev => {
      const candidate = prev + stepValue;

      return infiniteValue
        ? candidate > maxIndex
          ? 0
          : candidate
        : Math.min(candidate, maxIndex);
    });
  };

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);

    setStepValue(isNaN(val) || val < 1 ? 1 : val);
  };

  const handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const newFrameSize = isNaN(val) || val < 1 ? 1 : val;

    setFrameSizeValue(newFrameSize);
    if (currentIndex > images.length - newFrameSize) {
      setCurrentIndex(images.length - newFrameSize);
    }
  };

  const viewportWidth =
    frameSizeValue * itemWidthValue + (frameSizeValue - 1) * gap;

  const isPrevDisabled = !infiniteValue && currentIndex === 0;

  const isNextDisabled = !infiniteValue && currentIndex >= maxIndex;

  return (
    <div className="Carousel">
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="stepId">Step:</label>
        <input
          id="stepId"
          type="number"
          value={stepValue}
          onChange={handleStepChange}
          min={1}
          style={{ marginLeft: '5px', width: '40px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="itemId">Item width:</label>
        <input
          id="itemId"
          data-cy="itemId"
          type="number"
          value={itemWidthValue}
          onChange={e => setItemWidthValue(parseInt(e.target.value, 10) || 10)}
          min={10}
          style={{ marginLeft: '5px', width: '50px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="frameId">Frame size:</label>
        <input
          id="frameId"
          type="number"
          value={frameSizeValue}
          onChange={handleFrameSizeChange}
          min={1}
          max={images.length}
          style={{ marginLeft: '5px', width: '40px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="animationId">Animation duration (ms):</label>
        <input
          id="animationId"
          data-cy="animationId"
          type="number"
          value={animationDurationValue}
          onChange={e =>
            setAnimationDuration(parseInt(e.target.value, 10) || 1000)
          }
          min={0}
          style={{ marginLeft: '5px', width: '60px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="infiniteId">Infinite mode:</label>
        <input
          id="infiniteId"
          data-cy="infinite"
          type="checkbox"
          checked={infiniteValue}
          onChange={e => setInfiniteValue(e.target.checked)}
          style={{ marginLeft: '5px' }}
        />
      </div>

      <div className="Carousel__viewport" style={{ width: viewportWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * (itemWidthValue + gap)}px)`,
            transition: `transform ${animationDurationValue}ms ease`,
            gap: gap,
          }}
        >
          {images.map((image, idx) => (
            <li key={idx}>
              <img
                data-cy={String(idx)}
                ref={el => {
                  if (el) {
                    el.setAttribute('width', `${itemWidthValue}`);
                    el.setAttribute('height', `${itemWidthValue}`);
                    imgRefs.current[idx] = el;
                  }
                }}
                className="Carousel__img"
                src={image}
                alt={`img-${idx}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handlePrev}
        disabled={isPrevDisabled}
        className={`Carousel__prev ${isPrevDisabled ? 'Disabled' : ''}`}
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={`Carousel__next ${isNextDisabled ? 'Disabled' : ''}`}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
