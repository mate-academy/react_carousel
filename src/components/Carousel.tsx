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
    const nextIndex = currentIndex + step;

    if (nextIndex < images.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevClick = () => {
    const prevIndex = currentIndex - step;

    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  const translateValue = `translateX(-${currentIndex * imageSize}px)`;

  return (
    <>
      <div className="Carousel">
        <div
          className="Container"
          style={{ width: `${containerWidth}px`, transform: translateValue }}
        >
          <ul className="Carousel__list">
            {images.map((img, index) => (
              <li
                key={img}
                className="Carousel__list--item"
                style={{ width: `${imageSize}` }}
              >
                <img src={img} alt={`${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={handlePrevClick}
        >
          Prev
        </button>
        <button
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
