import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const finalIndex = images.length - frameSize;
  const [transitionDuration, setTransitionDuration] = useState(0);
  const widthContainer = itemWidth * frameSize;

  // const handlePrevClick = () => {
  //   const newIndex = currentIndex - step;

  //   if (infinite) {
  //     setCurrentIndex(newIndex < 0 ? images.length + newIndex : newIndex);
  //   } else {
  //     setCurrentIndex(newIndex >= 0 ? newIndex : 0);
  //   }

  //   setTransitionDuration(animationDuration);
  // };

  function handlePrevClick() {
    if (currentIndex > 0) {
      setCurrentIndex(prev => (
        prev - step >= 0
          ? prev - step
          : 0
      ));
    } else {
      setCurrentIndex(finalIndex);
    }

    setTransitionDuration(animationDuration);
  }

  function handleNextClick() {
    if (currentIndex < finalIndex) {
      setCurrentIndex(prev => (
        prev + step <= finalIndex
          ? prev + step
          : finalIndex
      ));
    } else {
      setCurrentIndex(0);
    }

    setTransitionDuration(animationDuration);
  }

  // const handleNextClick = () => {
  //   const newIndex = currentIndex + step;

  //   if (infinite) {
  //     setCurrentIndex(newIndex >= images.length
  //       ? newIndex - images.length
  //       : newIndex);
  //   } else {
  //     setCurrentIndex(newIndex + frameSize <= images.length
  //       ? newIndex
  //       : images.length - frameSize);
  //   }

  //   setTransitionDuration(animationDuration);
  // };

  return (
    <div className="Carousel" style={{ width: widthContainer }}>
      <div
        className="Carousel__wrapper"
        style={{
          transform: `translateX(${-currentIndex * itemWidth}px)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li className="Carousel__item" key={image}>
              <img
                style={{ width: itemWidth }}
                src={image}
                alt={(index + 1).toString()}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__button-wrapper">
        <button
          className={`Carousel__button ${currentIndex === 0 && !infinite ? 'disabled' : ''}`}
          disabled={!infinite && currentIndex === 0}
          onClick={handlePrevClick}
          type="button"
          data-cy="next"
        >
          Prev
        </button>
        <button
          className={`Carousel__button ${currentIndex + frameSize >= images.length && !infinite ? 'disabled' : ''}`}
          disabled={!infinite
            && currentIndex + frameSize >= images.length}
          onClick={handleNextClick}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
