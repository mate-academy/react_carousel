import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images?: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images = ['./img/1.png', './img/2.png'],
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const frame = itemWidth * frameSize;
  const stepIcon = itemWidth * step;
  const maxStartIndex = Math.max(0, images.length - frameSize);
  const maxTranslate = maxStartIndex * itemWidth;

  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const clamped = Math.max(-maxTranslate, Math.min(0, transform));

    if (clamped !== transform) {
      setTransform(clamped);
    }
  }, [transform, maxTranslate]);

  function trans() {
    if (transform <= -maxTranslate) {
      setTransform(-maxTranslate);
      if (infinite) {
        setTransform(0);

        return;
      }
    } else {
      setTransform(transform - stepIcon);
    }
  }

  function transfer() {
    if (transform >= 0) {
      if (infinite) {
        setTransform(-maxTranslate);

        return;
      }
    } else {
      setTransform(transform + stepIcon);
    }
  }

  return (
    <div className="Carousel">
      <div style={{ width: frame }} className="Carousel__content">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${transform}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((icon, index) => (
            <li
              className="Carousel__item"
              key={index}
              style={{ width: itemWidth }}
            >
              <img
                width={itemWidth}
                className="Carousel__icon"
                src={icon}
                alt={`${index}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        className="Carousel__button Carousel__button--prev"
        disabled={transform === 0 && !infinite}
        onClick={() => transfer()}
        type="button"
      >
        Prev
      </button>
      <button
        className="Carousel__button Carousel__button--next"
        data-cy="next"
        type="button"
        disabled={!infinite && transform <= -maxTranslate}
        onClick={() => trans()}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
