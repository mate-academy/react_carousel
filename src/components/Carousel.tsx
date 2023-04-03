import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSize, setImageSize] = useState(130);
  const [visibleImages, setVisibleImages] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const containerWidth = (currentIndex + visibleImages) * imageSize;

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

  const translateValue = `translateX(-${currentIndex * imageSize}px)`;

  // STYLES >>>
  const containerStyles = {
    width: `${containerWidth}px`,
    transform: translateValue,
    transition: `all ${animationDuration}ms`,
  };

  const imageStyles = {
    height: `${imageSize}px`,
    width: `${imageSize}px`,
  };
  // <<< STYLES

  return (
    <>
      <div className="Carousel">
        <div
          className="Container"
          style={containerStyles}
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
        <button
          className="button"
          type="button"
          onClick={handlePrevClick}
        >
          Prev
        </button>
        <button
          className="button"
          type="button"
          onClick={handleNextClick}
          data-cy="next"
        >
          Next
        </button>
      </div>

      <div className="Input">
        <span>ItemWidth</span>
        <input
          className="Input__field"
          type="number"
          value={imageSize}
          onChange={(event) => setImageSize(+event.target.value)}
        />
        <span>FrameSize</span>
        <input
          className="Input__field"
          type="number"
          value={visibleImages}
          onChange={(event) => setVisibleImages(+event.target.value)}
        />
        <span>Step</span>
        <input
          className="Input__field"
          type="number"
          value={step}
          onChange={(event) => setStep(+event.target.value)}
        />
        <span>AnimationDuration</span>
        <input
          className="Input__field"
          type="number"
          value={animationDuration}
          onChange={(event) => setAnimationDuration(+event.target.value)}
        />
      </div>
    </>
  );
};

export default Carousel;
