import React, { useCallback, useState } from 'react';
import './Carousel.scss';
import { debounce } from 'lodash';

type Props = {
  images: string[],
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSize, setImageSize] = useState(130);
  const [visibleImages, setVisibleImages] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [inputValue, setInputValue] = useState(130);

  const wrapper = useCallback(
    debounce((value: number) => {
      setImageSize(value);
    }, 1000),
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    setInputValue(value);
    wrapper(value);
  };

  const handleNextClick = () => {
    const imagesLeft = images.length - currentIndex - visibleImages;
    const nextIndex = currentIndex + Math.min(step, imagesLeft);

    setCurrentIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex = currentIndex - Math.min(step, currentIndex);

    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  const containerWidth = visibleImages * inputValue;

  const translateValue = `translateX(-${currentIndex * imageSize}px)`;

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + visibleImages === images.length;

  // STYLES >>>
  const containerStylesOuter = {
    width: `${containerWidth}px`,
    transition: `all ${animationDuration}ms`,
  };

  const containerStylesInner = {
    transform: translateValue,
    transition: `all ${animationDuration}ms`,
  };

  const imageStyles = {
    height: `${imageSize}px`,
    width: `${imageSize}px`,
  };
  // <<< STYLES

  return (
    <div className="Page">
      <div className="Carousel">
        <div className="outer" style={containerStylesOuter}>
          <div
            className="container"
            style={containerStylesInner}
          >
            <ul className="Carousel__list">
              {images.map((img, index) => (
                <li
                  key={img}
                  className="Carousel__list--item"
                >
                  <img
                    src={img}
                    alt={`${index + 1}`}
                    className="image"
                    style={imageStyles}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div className="buttons">
        <button
          className="button"
          type="button"
          onClick={handlePrevClick}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          className="button"
          type="button"
          onClick={handleNextClick}
          data-cy="next"
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>

      <div className="Input">
        <span className="Input__title">Item Width</span>
        <input
          className="Input__field"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          step={10}
        />
        <span className="Input__title">Frame Size</span>
        <input
          className="Input__field"
          type="number"
          value={visibleImages}
          onChange={(event) => setVisibleImages(+event.target.value)}
        />
        <span className="Input__title">Step</span>
        <input
          className="Input__field"
          type="number"
          value={step}
          onChange={(event) => setStep(+event.target.value)}
        />
        <span className="Input__title">Animation Duration</span>
        <input
          className="Input__field"
          type="number"
          value={animationDuration}
          onChange={(event) => setAnimationDuration(+event.target.value)}
          step={100}
        />
      </div>
    </div>
  );
};

export default Carousel;
