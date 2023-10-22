import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step:number;
  width: number;
  duration: number;
  frameSize: number;
  isInfinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  width,
  duration,
  frameSize,
  isInfinite,
}) => {
  const [indexCurrImg, setIndexCurrImg] = useState(0);
  const minIndex = 0;
  const maxIndex = 9 * width;
  const maxVisibleIndex = (9 * width) - (width * (frameSize - 1));
  const canMovePrev = indexCurrImg - width > minIndex || isInfinite;

  let canMoveNext = indexCurrImg + width < maxIndex || isInfinite;

  if (indexCurrImg === maxVisibleIndex && !isInfinite) {
    canMoveNext = false;
  }

  const itemStyle = {
    transform: `translate(-${indexCurrImg}px)`,
    transition: `all ${duration}ms`,
  };

  function handlePrev() {
    const indexPrevImg = indexCurrImg - (width * step);

    if (indexPrevImg <= minIndex && !isInfinite) {
      setIndexCurrImg(minIndex);
    } else if (indexPrevImg < minIndex
      && isInfinite
      && indexCurrImg !== minIndex) {
      setIndexCurrImg(minIndex);
    } else if (indexPrevImg <= minIndex && isInfinite) {
      setIndexCurrImg(maxVisibleIndex);
    } else {
      setIndexCurrImg(indexCurrImg - (width * step));
    }
  }

  function handleNext() {
    const indexNextImg = indexCurrImg + (width * step);

    if (indexNextImg > maxVisibleIndex && !isInfinite) {
      setIndexCurrImg(maxVisibleIndex);
    } else if (indexNextImg > maxVisibleIndex
      && isInfinite
      && indexCurrImg !== maxVisibleIndex) {
      setIndexCurrImg(maxVisibleIndex);
    } else if (indexNextImg > maxIndex && isInfinite) {
      setIndexCurrImg(minIndex);
    } else {
      setIndexCurrImg(indexNextImg);
    }
  }

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handlePrev}
        aria-disabled={!canMovePrev}
        className={cn('Carousel__button', {
          'Carousel__button--active': canMovePrev,
          'Carousel__button--disactive': !canMovePrev,
        })}
      >
        <img
          src="./icons/arr_left.svg"
          alt="arrow_left"
          className="Carousel__icon"
        />
      </button>

      <div
        className="Carousel__container"
        style={{ width: `${frameSize * width + 40}px` }}
      >
        <ul
          className="Carousel__list"
        >
          {images.map(image => {
            let imageId = +(image.substring(
              image.lastIndexOf('.') - 1, image.lastIndexOf('.') + 1,
            ));

            if (imageId === 0) {
              imageId = 10;
            }

            return (
              <li
                key={imageId}
                className="Carousel__item"
                style={itemStyle}

              >
                <img
                  src={`./img/${imageId}.png`}
                  alt={String(imageId)}
                  width={width}
                  className="Carousel__image"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        aria-disabled={!canMoveNext}
        className={cn('Carousel__button', {
          'Carousel__button--active': canMoveNext,
          'Carousel__button--disactive': !canMoveNext,
        })}
      >
        <img
          src="./icons/arr_right.svg"
          alt="arrow_rigth"
          className="Carousel__icon"
        />
      </button>
    </div>
  );
};

export default Carousel;
