import React from 'react';

import './Carousel.css';

const Carousel = ({ images, initialState, prevClick, position, width, count, nextClick, changeItemWidth, value, imageSize, changeElementNumber, step, changeStep, height, isActive, startRotate, stopRotate}) => {
  const styles = {
    marginLeft: `-${position}px`,
  };

  const wrapperStyle = {
    width: `${imageSize * count}px`,
    height: `${imageSize * count}px`,
  };

  const bubbleSize = {
    width: `${imageSize}px`,
  };

  return (
    <div>

      <button
        type="button"
        onClick={prevClick}
      >
        Prev
      </button>

      <button
        type="button"
        onClick={nextClick}
      >
        Next
      </button>

      Size of pictures:
      <input
        type="range"
        min="130"
        max="390"
        value={imageSize}
        onChange={changeItemWidth}
      />

      Nubmer of bubbles:
      <select value={count} onChange={changeElementNumber}>
        {images.map((img, index) => (
          <option key={img} value={index + 1}>{index + 1}</option>
        ))}
      </select>

      Step:
      <select value={step} onChange={changeStep}>
        {images.map((img, i) => (
          <option key={img} value={i + 1}>{i + 1}</option>
        ))}
      </select>

      Rotate:
      {isActive === false
        ? <button type="button" onClick={startRotate}>Start</button>
        : <button type="button" onClick={stopRotate}>Stop</button>
      }

      <div>

        <div
          className="Carousel"
          style={wrapperStyle}
        >
          <ul
            className="Carousel__list"
            style={styles}
          >
            {images.map((img, index) => (
              <li key={img} style={bubbleSize}><img style={bubbleSize} src={img} alt={index + 1} /></li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
