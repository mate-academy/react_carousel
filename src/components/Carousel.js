import React from 'react';
import propTypes from 'prop-types';

import './Carousel.css';

const Carousel = ({
  images,
  prevClick,
  position,
  count,
  nextClick,
  changeItemWidth,
  imageSize,
  changeElementNumber,
  step,
  changeStep,
  isActive,
  startRotate,
  stopRotate,
}) => {
  const styles = {
    marginLeft: `-${position}px`,
  };
  // console.log(position)

  const wrapperStyle = {
    width: `${imageSize * count}px`,
    height: `${imageSize * count}px`,
  };

  const bubbleSize = {
    width: `${imageSize}px`,
  };

  const buttonContainer = {
    width: `${imageSize * count + 70}px`,
    height: `${imageSize * count + 70}px`,
  };

  return (
    <div>
      <div className="menuContainer">
      Size of pictures:
        <input
          type="range"
          min="130"
          max="390"
          value={imageSize}
          onChange={changeItemWidth}
          className="menu-item"
        />

        Nubmer of bubbles:
        <select
          className="menu-item"
          value={count}
          onChange={changeElementNumber}
        >
          {images.map((img, index) => (
            <option key={img} value={index + 1}>{index + 1}</option>
          ))}
        </select>

        Step:
        <select className="menu-item" value={step} onChange={changeStep}>
          {images.map((img, i) => (
            <option key={img} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        Rotate:
        {/* {isActive === false
          ? <button type="button" onClick={startRotate}>Start</button>
          : <button type="button" onClick={stopRotate}>Stop</button>
        } */}

        {isActive && (
          <button
            className="menu-item"
            type="button"
            onClick={stopRotate}
          >
            Stop
          </button>
        )}

        {!isActive && (
          <button
            className="menu-item"
            type="button"
            onClick={startRotate}
          >
            Start
          </button>
        )}

      </div>
      <div className="Carousel-wrapper">

        <div className="button-container" style={buttonContainer}>

          <button
            className="Carousel__left-button"
            type="button"
            onClick={prevClick}
          />

          <div
            className="Carousel"
            style={wrapperStyle}
          >

            <ul
              className="Carousel__list"
              style={styles}
              value={(styles.marginLeft)}
            >
              {images.map((img, index) => (
                <li key={img} style={bubbleSize}>
                  <img style={bubbleSize} src={img} alt={index + 1} />
                </li>
              ))}

            </ul>

          </div>

          <button
            className="Carousel__right-button"
            type="button"
            onClick={nextClick}
          />

        </div>

      </div>
    </div>
  );
};

export default Carousel;

Carousel.propTypes = {
  images: propTypes.arrayOf(propTypes.string).isRequired,
  prevClick: propTypes.func.isRequired,
  nextClick: propTypes.func.isRequired,
  position: propTypes.number.isRequired,
  imageSize: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
  step: propTypes.number.isRequired,
  changeItemWidth: propTypes.func.isRequired,
  changeElementNumber: propTypes.func.isRequired,
  changeStep: propTypes.func.isRequired,
  startRotate: propTypes.func.isRequired,
  stopRotate: propTypes.func.isRequired,
  isActive: propTypes.bool.isRequired,
};
