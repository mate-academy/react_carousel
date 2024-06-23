import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinity: boolean;
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinity,
}) => {
  const [position, setPosition] = useState(0);

  const widthFrame = frameSize * itemWidth + (frameSize - 1) * 10;
  const translate = (itemWidth + 10) * position;
  const disabledButtonLeft = !infinity && position === 0;
  const disabledButtonRight =
    !infinity && position >= images.length - frameSize;

  const leftPosition = () => {
    if (infinity && position === 0) {
      setPosition(images.length - frameSize);

      return;
    }

    setPosition(prev => Math.max(0, prev - step));
  };

  const rightPosition = () => {
    if (infinity && position >= images.length - frameSize) {
      setPosition(0);

      return;
    }

    setPosition(next => Math.min(next + step, images.length - frameSize));
  };

  return (
    <div className="Carousel" style={{ width: widthFrame }}>
      <ul
        className="Carousel__list"
        style={{
          gap: 10,
          transform: `translateX(-${translate}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map(image => (
          <li key={image}>
            <img
              width={itemWidth}
              height={itemWidth}
              src={image}
              alt={`${image}`}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__button">
        <button
          className={`Carousel__button-btn ${disabledButtonLeft && 'Carousel__button-btn--disabled'}`}
          type="button"
          onClick={leftPosition}
          disabled={disabledButtonLeft}
        >
          Prev
        </button>
        <button
          data-cy="next"
          className={`Carousel__button-btn ${disabledButtonRight && 'Carousel__button-btn--disabled'}`}
          type="button"
          onClick={rightPosition}
          disabled={disabledButtonRight}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
