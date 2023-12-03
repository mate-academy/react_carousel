import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  nav: boolean,
};

const getNavIds = (n: number) => {
  const ids = [];

  for (let i = 0; i < n; i += 1) {
    ids.push(i);
  }

  return ids;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  nav,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentNavPosition, setCurrentNavPosition] = useState(0);

  const navIds = getNavIds(Math.ceil(images.length / frameSize));

  const maxNavId = navIds[navIds.length - 1];
  const maxTransform = itemWidth * images.length - frameSize * itemWidth;

  const carouselDynamicStyles = {
    width: frameSize * itemWidth,
  };

  const carouselListDynamicStyles = {
    transform: `translateX(${currentPosition}px)`,
    transition: `transform ${animationDuration / 1000}s ease`,
  };

  const imageDynamicStyles = {
    width: itemWidth,
  };

  const handleNextClick = () => {
    if (currentPosition === -(maxTransform)) {
      if (infinite) {
        setCurrentPosition(0);
        setCurrentNavPosition(0);
      }

      return;
    }

    if ((currentPosition - step * itemWidth) < -maxTransform) {
      setCurrentPosition(-maxTransform);
      setCurrentNavPosition(maxNavId);

      return;
    }

    setCurrentNavPosition(prev => prev + 1);
    setCurrentPosition(prev => prev - step * itemWidth);
  };

  const handlePrevClick = () => {
    if (currentPosition === 0) {
      if (infinite) {
        setCurrentPosition(-maxTransform);
        setCurrentNavPosition(maxNavId);
      }

      return;
    }

    if ((currentPosition + step * itemWidth) > 0) {
      setCurrentPosition(0);
      setCurrentNavPosition(0);

      return;
    }

    setCurrentNavPosition(prev => prev - 1);
    setCurrentPosition(prev => prev + step * itemWidth);
  };

  const handleNavBtnClick = (id: number) => {
    if (id === maxNavId) {
      setCurrentPosition(-maxTransform);
    } else {
      setCurrentPosition(-(step * itemWidth * id));
    }

    setCurrentNavPosition(id);
  };

  return (
    <div className="Carousel" style={carouselDynamicStyles}>
      <ul className="Carousel__list" style={carouselListDynamicStyles}>
        {images.map(imageUrl => (
          <li key={imageUrl}>
            <img
              src={imageUrl}
              alt="carousel_image"
              className="Carousel__image"
              style={imageDynamicStyles}
            />
          </li>
        ))}
      </ul>

      {nav && (
        <nav className="carousel__nav">
          {navIds.map(navId => (
            <button
              type="button"
              className={`nav-button ${navId === currentNavPosition ? 'active' : ''}`}
              aria-label={`Go to slide ${navId}`}
              key={navId}
              onClick={() => handleNavBtnClick(navId)}
            />
          ))}
        </nav>
      )}

      <div className="carousel__button-wrapper">
        <button
          data-cy="prev"
          type="button"
          className="arrow-button"
          onClick={handlePrevClick}
          disabled={currentPosition === 0 && !infinite}
        >
          &#x25C0;
        </button>
        <button
          data-cy="next"
          type="button"
          className="arrow-button"
          onClick={handleNextClick}
          disabled={currentPosition === -(maxTransform) && !infinite}
        >
          &#x25B6;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
