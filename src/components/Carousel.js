import React from 'react';
import './Carousel.scss';
import PropTypes from 'prop-types';

const Carousel = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => (
  <div className="Carousel">
    <div
      className="Container"
      style={{
        width: (itemWidth * frameSize),
      }}
    >
      {images.map((image, i) => (
        <img
          src={image}
          alt={i}
          key={image}
          className="Slide"
          style={{
            width: `${itemWidth}px`,
            transition: `${animationDuration}ms`,
          }}
        />
      ))}
    </div>

    <div className="ButtonsWrapper">
      <button
        className="SliderButton"
        type="button"
        onClick={() => {
          const slide = document.querySelector('.Slide');
          const currentMargin = slide.style.marginLeft
            ? parseInt(slide.style.marginLeft, 10)
            : parseInt(window
              .getComputedStyle(slide).marginLeft, 10);
          let targetMargin = currentMargin + (itemWidth * step);

          if (targetMargin > 0) {
            targetMargin = 0;
          }

          slide.style.marginLeft = `${targetMargin}px`;
        }}
      />
      <button
        className="SliderButton"
        type="button"
        onClick={() => {
          const slide = document.querySelector('.Slide');
          const currentMargin = slide.style.marginLeft
            ? parseInt(slide.style.marginLeft, 10)
            : parseInt(window
              .getComputedStyle(slide).marginLeft, 10);
          let targetMargin = currentMargin - (itemWidth * step);

          if (targetMargin < -(itemWidth * (images.length - frameSize))) {
            targetMargin = -(itemWidth * (images.length - frameSize));
          }

          slide.style.marginLeft = `${targetMargin}px`;
        }}
      />
    </div>
  </div>
);

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
