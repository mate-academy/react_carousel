import React from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  isInfinite: boolean;
  translate: number;
  onTranslate: React.Dispatch<React.SetStateAction<number>>;
  onSlideIndex: (move: string) => void;
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  isInfinite,
  translate,
  onTranslate,
  onSlideIndex,
}) => {
  const maxTranslate = (images.length - frameSize) * itemWidth;
  const minTranslate = 0;
  const disableForward = translate === maxTranslate && !isInfinite;
  const disableBack = translate === minTranslate && !isInfinite;

  const moveForward = () => {
    if (isInfinite && translate === maxTranslate) {
      onTranslate(minTranslate);
      onSlideIndex('forward');

      return;
    }

    const newTranslate = translate + (step * itemWidth) > maxTranslate
      ? maxTranslate
      : translate + (step * itemWidth);

    onTranslate(newTranslate);

    onSlideIndex('forward');
  };

  const moveBack = () => {
    if (isInfinite && translate === minTranslate) {
      onTranslate(maxTranslate);
      onSlideIndex('back');

      return;
    }

    const newTranslate = translate - (step * itemWidth) <= minTranslate
      ? minTranslate
      : translate - (step * itemWidth);

    onTranslate(newTranslate);

    onSlideIndex('back');
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * itemWidth}px`, transition: `${animationDuration}ms all` }}
    >
      <div className="Carousel__container">
        <ul
          className="Carousel__list"
          style={{ transition: `${animationDuration}ms all`, transform: `translateX(-${translate}px)` }}
        >
          {images.map((image, index) => {
            return (
              <li key={image}>
                <img
                  width={itemWidth}
                  src={image}
                  alt={`${index + 1}`}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          style={{ transition: `${animationDuration}ms all` }}
          disabled={disableBack}
          className={cn(
            'Carousel__button',
            { 'Carousel__button--disabled': disableBack },
          )}
          type="button"
          onClick={moveBack}
        >
          Prev

        </button>

        <button
          data-cy="next"
          style={{ transition: `${animationDuration}ms all` }}
          disabled={disableForward}
          className={cn(
            'Carousel__button',
            { 'Carousel__button--disabled': disableForward },
          )}
          type="button"
          onClick={moveForward}
        >
          Next
        </button>
      </div>
    </div>
  );
};
