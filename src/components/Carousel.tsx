import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    if (infinite && currentImage === 0) {
      setCurrentImage(images.length - frameSize);
    } else {
      setCurrentImage(prev => Math.max(0, prev - step));
    }
  };

  const handleNext = () => {
    if (infinite && currentImage >= images.length - frameSize) {
      setCurrentImage(0);
    } else {
      setCurrentImage(prev => Math.min(prev + step, images.length - frameSize));
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize + (frameSize - 1) * 20}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: 20,
            transform: `translateX(-${currentImage * (itemWidth + 20)}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img src={image} alt={image} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          className={`Carousel__button ${!infinite && currentImage === 0 ? 'Carousel__button--off' : ''}`}
          onClick={() => handlePrev()}
        >
          {'<<<'}
        </button>
        <button
          type="button"
          className={`Carousel__button ${!infinite && currentImage >= images.length - frameSize ? 'Carousel__button--off' : ''}`}
          data-cy="next"
          onClick={() => handleNext()}
        >
          {'>>>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
