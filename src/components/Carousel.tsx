import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(130);
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);

  const marginRight = 10;

  const maxIndex = Math.max(0, images.length - frameSize);
  const offset = currentIndex * (itemWidth + marginRight);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - step, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + step, maxIndex));
  };

  const onChangeNumber =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Number(e.target.value));
      setter(value);
      setCurrentIndex(0);
    };

  return (
    <>
      <h1 data-cy="title">Carousel</h1>

      <label htmlFor="itemId">Image width</label>
      <input
        id="itemId"
        type="number"
        value={itemWidth}
        onChange={onChangeNumber(setItemWidth)}
      />

      <label htmlFor="frameId">Frame size</label>
      <input
        id="frameId"
        type="number"
        value={frameSize}
        onChange={onChangeNumber(setFrameSize)}
      />

      <label htmlFor="stepId">Step</label>
      <input
        id="stepId"
        type="number"
        value={step}
        onChange={onChangeNumber(setStep)}
      />

      <div
        className="Carousel__wrapper"
        style={{
          width: frameSize * (itemWidth + marginRight) - marginRight,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {images.map((src, index) => (
            <li
              key={src}
              className="Carousel__item"
              style={{
                width: itemWidth,
                marginRight: index === images.length - 1 ? 0 : marginRight,
              }}
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                width={itemWidth}
                height={130}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__controls">
        <button
          type="button"
          data-cy="prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
