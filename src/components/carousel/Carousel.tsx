import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  width: number;
  size: number;
  step: number;
  duration: number;
}

const Carousel: React.FC<Props> = ({ images, width, size, step, duration }) => {
  const [formValue, setFormValue] = useState({
    width: Number(width),
    size: Number(size),
    step: Number(step),
    duration: Number(duration),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValue(prevValues => ({
      ...prevValues,
      [name]: Number(value),
    }));
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - formValue.step, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      const maxIndex = images.length - formValue.size;

      return Math.min(prevIndex + formValue.step, maxIndex);
    });
  };

  return (
    <>
      <div className="Customized">
        <div className="Customized__block">
          <label htmlFor="itemId" className="Customized__label">
            Item width
            <input
              id="itemId"
              type="number"
              name="width"
              className="Customized__input Customized__input--width"
              value={formValue.width}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="Customized__block">
          <label htmlFor="frameId" className="Customized__label">
            Frame size
            <input
              id="frameId"
              type="number"
              name="size"
              className="Customized__input Customized__input--width"
              value={formValue.size}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="Customized__block">
          <label htmlFor="stepId" className="Customized__label">
            Scroll step
            <input
              id="stepId"
              type="number"
              name="step"
              className="Customized__input Customized__input--width"
              value={formValue.step}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="Customized__block">
          <label htmlFor="animationId" className="Customized__label">
            Duration
            <input
              id="animationId"
              type="number"
              name="duration"
              className="Customized__input Customized__input--width"
              value={formValue.duration}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <div className="Carousel">
        <button
          type="button"
          className="Carousel__button"
          disabled={currentIndex === 0}
          onClick={handlePrev}
          aria-disabled={currentIndex === 0 ? 'true' : 'false'}
        >
          «
        </button>
        <div
          className="Carousel__wrapper"
          style={{
            width: `${formValue.width * formValue.size}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${currentIndex * formValue.width}px)`,
              transition: `transform ${formValue.duration}ms ease`,
            }}
          >
            {images.map(image => (
              <li key={image}>
                <img
                  className="Carousel__image"
                  src={image}
                  alt={image}
                  width={formValue.width}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          data-cy="next"
          className="Carousel__button"
          disabled={currentIndex >= images.length - formValue.size}
          onClick={handleNext}
          aria-disabled={
            currentIndex >= images.length - formValue.size ? 'true' : 'false'
          }
        >
          »
        </button>
      </div>
    </>
  );
};

export default Carousel;
