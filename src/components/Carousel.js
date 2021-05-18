import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

export const Carousel = ({
  images,
  frameSize,
  step,
  itemWidth,
  animationDuration,
  infinite,
  render,
}) => {
  const [container, setContainer] = useState(null);
  const [scroll, setScroll] = useState(0);
  const maxScroll = 1300 - frameSize * itemWidth - scroll;

  useEffect(() => {
    const element = document.getElementById('carousel');

    setContainer(element);
  }, []);

  const onMoveLeft = () => {
    container.scrollLeft -= step * itemWidth;
    setScroll(prev => prev - step * itemWidth);
  };

  const onMoveRight = () => {
    container.scrollLeft += step * itemWidth;
    setScroll(prev => prev + step * itemWidth);
  };

  return (
    <>
      <div
        className="Carousel-container"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <div
          id="carousel"
          className="Carousel"
          style={
            {
              width: `${frameSize * itemWidth}px`,
              transition: `${animationDuration}ms`,
            }
          }
        >
          <ul id="carousel-items" className="Carousel__list">
            {images.map(img => (
              <li key={img} style={{ width: `${itemWidth}px` }}>
                <img src={`.${img}`} alt={img} />
              </li>
            ))}
          </ul>
        </div>
        <button className="arrow-button" onClick={onMoveRight} type="button">
          <span
            className="arrow-right"
            style={{ display: maxScroll > 0 ? 'block' : 'none' }}
          />
        </button>
        <button className="arrow-button" onClick={onMoveLeft} type="button">
          <span
            className="arrow-left"
            style={{ display: scroll ? 'block' : 'none' }}
          />
        </button>
      </div>
      {render()}
    </>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
};
