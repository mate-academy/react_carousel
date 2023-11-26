import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}) => {
  const [translation, setTranslation] = useState(0);
  const widthOfAllImages = itemWidth * images.length;
  const stepWidth = itemWidth * step;
  const frameWidth = itemWidth * frameSize;

  const handleNext = () => {
    if (Math.abs(translation) + stepWidth <= widthOfAllImages - frameWidth) {
      setTranslation(translation - stepWidth);
    } else {
      setTranslation(frameWidth - widthOfAllImages);
    }
  };

  const handlePrev = () => {
    if (translation + stepWidth <= 0) {
      setTranslation(translation + stepWidth);
    } else {
      setTranslation(0);
    }
  };

  return (
    <div className="Carousel" style={{ maxWidth: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${translation}px)`,
          maxWidth: `${widthOfAllImages}px`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={`${index + 1}`}>
            <img style={{ width: `${itemWidth}px` }} src={image} alt={`${index + 1}`} />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button type="button" onClick={handlePrev} disabled={translation === 0}>
          {'<<<'}
        </button>
        <button
          data-cy="next"
          type="button"
          onClick={handleNext}
          disabled={translation === frameWidth - widthOfAllImages}
        >
          {'>>>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
