import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
};

export const Carousel: React.FC<Props> = ({
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  images,
}) => {
  const prevImages = (stepNum: number) => {
    const list = document.querySelector('.wrapper');

    if (list) {
      list.scrollLeft -= stepNum * itemWidth;
    }
  };

  const nextImages = (stepNum: number) => {
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
