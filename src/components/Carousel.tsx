import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  images, itemWidth, frameSize, step, animationDuration,
}) => {
  const [movePx, setMovePx] = useState(0);
  const totalWidth = -(itemWidth * 10);
  const maxWidth = totalWidth + itemWidth * frameSize;

  const handleNextEmojiClick = () => {
    setMovePx((currentMovePx) => {
      if (currentMovePx - itemWidth * step < (maxWidth)) {
        for (let i = itemWidth * step; i !== 0; i -= itemWidth) {
          if (currentMovePx - i === maxWidth) {
            return currentMovePx - i;
          }
        }
      }

      return currentMovePx - itemWidth * step;
    });
  };

  const handlePrevEmojiClick = () => {
    setMovePx((currentMovePx) => {
      if (currentMovePx + itemWidth * step > 0) {
        for (let i = itemWidth; i !== 0; i += itemWidth) {
          if (currentMovePx + i === 0) {
            return currentMovePx + i;
          }
        }
      }

      return currentMovePx + itemWidth * step;
    });
  };

  return (
    <div className="Carousel">
      <div className="container" style={{ width: frameSize * itemWidth }}>
        <div
          className="container2"
          style={{
            transform: `translateX(${movePx}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          <ul className="Carousel__list">
            {images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  alt={`emoji ${index + 1}`}
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__buttons-button"
          onClick={handlePrevEmojiClick}
          disabled={movePx === 0}
        >
          {'Prev <<'}
        </button>
        <button // style buttons so that they look like arrows
          type="button"
          className="Carousel__buttons-button" // add a disabled class and style for this class
          onClick={handleNextEmojiClick}
          disabled={movePx === maxWidth}
          data-cy="next"
        >
          {'Next >>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
