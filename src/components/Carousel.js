import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

const Carousel = ({ images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite }) => {
  const [container, setContainer] = useState(null);
  const [scroll, setScroll] = useState(0);
  const maxScroll = 1300 - itemWidth * frameSize;

  useEffect(() => {
    const element = document.getElementById('carousel');

    setContainer(element);
  }, [scroll]);

  const onMoveLeft = () => {
    container.scrollLeft -= step * itemWidth;
    setScroll(container.scrollLeft);
  };

  const onMoveRight = () => {
    container.scrollLeft += step * itemWidth;
    setScroll(container.scrollLeft);
  };

  return (
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
            transition: `transform ${animationDuration}ms`,
          }
        }
      >
        <ul id="carousel-items" className="Carousel__list">
          {images.map(img => (
            <li key={img} style={{ width: `${itemWidth}px` }}>
              <img src={img} alt={img} />
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onMoveRight} type="button">
        <span
          className="arrow-right"
          style={{ display: scroll !== maxScroll ? 'block' : 'none' }}
        />
      </button>
      <button onClick={onMoveLeft} type="button">
        <span
          className="arrow-left"
          style={{ display: scroll ? 'block' : 'none' }}
        />
      </button>

    </div>
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
};
export default Carousel;
