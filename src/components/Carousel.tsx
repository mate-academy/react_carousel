import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

export const Carousel: React.FC<Props> = ({
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  images,
}) => {
  const sliderLength = images.length * itemWidth;

  const intervalId = setInterval(() => {
    const list = document.querySelector('.wrapper');

    if (list && list.scrollLeft < sliderLength - itemWidth * 2 * step) {
      list.scrollLeft += 130;
    } else {
      clearInterval(intervalId);
    }
  }, animationDuration);

  const prevImages = (stepNum: number) => {
    clearInterval(intervalId);

    const list = document.querySelector('.wrapper');

    if (list) {
      list.scrollLeft -= stepNum * itemWidth;
    }
  };

  const nextImages = (stepNum: number) => {
    clearInterval(intervalId);

    const list = document.querySelector('.wrapper');

    if (list) {
      list.scrollLeft += stepNum * itemWidth;
    }
  };

  const styles = {
    width: frameSize * itemWidth,
  };

  return (
    <div className="container">
      <button
        className="button button--prev"
        type="button"
        onClick={() => prevImages(step)}
      >
        {'<'}
      </button>
      <div className="wrapper">
        <div className="Carousel" style={styles}>
          <ul className="Carousel__list">
            {images.map(image => (
              <li key={image}>
                <img
                  src={image}
                  alt={image}
                  style={{ width: itemWidth }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="button button--next"
        type="button"
        onClick={() => nextImages(step)}
      >
        {'>'}
      </button>
    </div>
  );
};
