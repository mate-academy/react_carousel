import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  position : number,
  animationDuration : number,
  frameSize: number,
  itemWidth: number,
  isPrevBtnActive: boolean,
  handlePrevBtnClick: () => void
  isNextBtnActive: boolean,
  handleNextBtnClick: () => void
}

export const Carousel: React.FC<Props> = ({
  images,
  position,
  animationDuration,
  frameSize,
  itemWidth,
  isPrevBtnActive,
  handlePrevBtnClick,
  isNextBtnActive,
  handleNextBtnClick,
}) => {
  const widthCarouselBlock = frameSize * itemWidth;
  const translateCoords = position * -itemWidth;

  const prevCls = [
    'Carousel__button',
    !isPrevBtnActive ? 'is-disabled' : '',
  ];

  const nextCls = [
    'Carousel__button',
    !isNextBtnActive ? 'is-disabled' : '',
  ];

  return (
    <div className="Carousel">
      <div
        className="Carousel__content"
        style={{
          maxWidth: `${widthCarouselBlock}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateCoords}px)`,
            transition: `transform ${animationDuration}ms linear`,
          }}
        >
          {images.map((image, i) => (
            <li
              className="Carousel__item"
              style={{
                flexBasis: `${itemWidth}px`,
              }}
              key={image}
            >
              <img
                className="Carousel__image"
                src={image}
                alt={(i + 1).toString()}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__btns">
        <button
          type="button"
          disabled={!isPrevBtnActive}
          className={prevCls.join(' ')}
          onClick={handlePrevBtnClick}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={!isNextBtnActive}
          className={nextCls.join(' ')}
          onClick={handleNextBtnClick}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};
