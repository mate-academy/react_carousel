import React from 'react';
import cn from 'classnames';

import './Carousel.scss';

interface Props {
  images: string[];
  position: number,
  animationDuration: number,
  frameSize: number,
  actualImageWidth: number,
  isPrevButtonActive: boolean,
  isNextButtonActive: boolean,
  hadlePrevButtonClick: () => void
  hadleNextButtonClick: () => void
}

const Carousel: React.FC<Props> = ({
  images,
  position,
  animationDuration,
  frameSize,
  actualImageWidth,
  isPrevButtonActive,
  isNextButtonActive,
  hadlePrevButtonClick,
  hadleNextButtonClick,
}) => {
  const carouselWidth = frameSize * actualImageWidth;
  const translateCoords = position * -actualImageWidth;

  return (
    <>
      <div className="Carousel">
        <div
          className="Carousel__content"
          style={{ maxWidth: `${carouselWidth}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${translateCoords}px)`,
              transition: `transform ${animationDuration}ms linear`,
            }}
          >
            {images.map((image: string) => (
              <li
                key={image}
                className="Carousel__item"
                style={{
                  flexBasis: `${actualImageWidth}px`,
                }}
              >
                <img
                  src={image}
                  alt={`${image}`}
                  className="Carousel__image"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            type="button"
            disabled={!isPrevButtonActive}
            className={cn('Carousel__button__prev', {
              'is-disabled': !isPrevButtonActive,
            })}
            onClick={hadlePrevButtonClick}
          >
            Back
          </button>
          <button
            type="button"
            disabled={!isNextButtonActive}
            className={cn('Carousel__button__next', {
              'is-disabled': !isNextButtonActive,
            })}
            onClick={hadleNextButtonClick}
            data-cy="next"
          >
            Go!
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
