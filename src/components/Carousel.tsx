import React from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  translate: number;
  onTranslate: React.Dispatch<React.SetStateAction<number>>;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  translate,
  onTranslate,
}) => {
  const maxTranslate = (images.length - frameSize) * itemWidth;
  const minTranslate = 0;
  const disableForward = translate === maxTranslate && !infinite;
  const disableBack = translate === minTranslate && !infinite;

  const moveForward = () => {
    if (infinite && translate === maxTranslate) {
      onTranslate(minTranslate);

      return;
    }

    const newTranslate = translate + (step * itemWidth) > maxTranslate
      ? maxTranslate
      : translate + (step * itemWidth);

    onTranslate(newTranslate);
  };

  const moveBack = () => {
    if (infinite && translate === minTranslate) {
      onTranslate(maxTranslate);

      return;
    }

    const newTranslate = translate - (step * itemWidth) <= minTranslate
      ? minTranslate
      : translate - (step * itemWidth);

    onTranslate(newTranslate);
  };

  return (
    <div
      className="Carousel"
      data-qa={infinite}
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
                  src={image}
                  alt={(index + 1).toString()}
                  style={{ width: `${itemWidth}px` }}
                  data-qa={step}
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

export default Carousel;
