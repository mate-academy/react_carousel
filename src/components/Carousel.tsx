import React, { useState } from 'react';
import './Carousel.scss';
import c from 'classnames';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = images.length - frameSize;
  const translate = -currentIndex * itemWidth;

  const RightTranslation = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + step;

      return nextIndex > maxIndex ? maxIndex : nextIndex;
    });
  };

  const LeftTranslation = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev - step;

      return nextIndex < 0 ? 0 : nextIndex;
    });
  };

  return (
    <>
      <div className="Wrapper" style={{ width: `${frameSize * itemWidth}px` }}>
        <div
          className="Carousel"
          style={{ width: `${images.length * itemWidth}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${translate}px)`,
              transition: `transform ${animationDuration}ms ease-in-out`,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {images.map((image, index) => (
              <li key={index}>
                <img
                  src={image}
                  alt={(index + 1).toString()}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons">
          <button
            type="button"
            className={c('button button--next', {
              disabled: currentIndex === 0,
            })}
            onClick={LeftTranslation}
          >
            &lt; Prev
          </button>

          <button
            type="button"
            className={c('button button--next', {
              disabled: currentIndex >= maxIndex,
            })}
            onClick={RightTranslation}
            data-cy="next"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
