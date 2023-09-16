import React, { useState } from 'react';
import './Carousel.scss';
import { State } from '../interface';

const Carousel: React.FC<State> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
  infinite,
}) => {
  const caruselListwidth = frameSize * itemWidth;
  const [visibleImage, setVisibleImage] = useState(0);

  function moveNext(framesize:number):number {
    let mooweimage = 0;

    if (framesize === step) {
      mooweimage = visibleImage + step > images.length - step
        ? images.length - step
        : visibleImage + step;
    } else {
      mooweimage = visibleImage + step + framesize > images.length
        ? images.length - framesize
        : visibleImage + step;
    }

    if (visibleImage === images.length - frameSize && infinite) {
      return 0;
    }

    return mooweimage;
  }

  function movePrev(framesize:number):number {
    if (visibleImage === 0) {
      return images.length - frameSize;
    }

    return visibleImage <= framesize
      ? 0
      : visibleImage - step;
  }

  return (
    <div className="container">
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{ width: caruselListwidth }}
        >
          {images.map(image => {
            return (
              <li
                style={{
                  transform: `translateX(-${itemWidth * visibleImage}px)`,
                  transition: `${animationDuration}ms`,
                }}
                key={image}
              >
                <img
                  src={image}
                  style={{
                    width: itemWidth,
                  }}
                  alt="1"
                />
              </li>
            );
          })}

        </ul>
        <div className="button_container">
          <button
            disabled={visibleImage <= 0 && !infinite}
            type="button"
            onClick={() => {
              setVisibleImage(movePrev(frameSize));
            }}
          >
            Prev
          </button>
          <button
            data-cy="next"
            disabled={visibleImage + frameSize === images.length && !infinite}
            type="button"
            onClick={() => {
              setVisibleImage(moveNext(frameSize));
            }}
          >
            Next

          </button>
        </div>

      </div>

    </div>
  );
};

export default Carousel;
