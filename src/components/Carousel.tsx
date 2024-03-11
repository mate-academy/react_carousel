import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

type Props = {
  img: string[];
  itemWidth: number;
  duration: number;
  step: number;
  frameSize: number;
  isChecked: boolean;
};

const ITEMGAP = 5;

const Carousel: React.FC<Props> = ({
  img,
  itemWidth,
  duration,
  step,
  frameSize,
  isChecked,
}) => {
  const [currentPx, setCurrentPx] = useState(0);

  const itemWidthWithGap = itemWidth + ITEMGAP;
  const maxValueFrame = frameSize > img.length ? img.length : frameSize;
  const numberShowImg = maxValueFrame * itemWidthWithGap;
  const stepScrolImg = step * itemWidthWithGap;
  const maxWidth = -(itemWidthWithGap * (img.length - maxValueFrame));

  const goToNext = () => {
    setCurrentPx(
      currentPx - stepScrolImg > maxWidth ? currentPx - stepScrolImg : maxWidth,
    );

    if (currentPx === maxWidth && isChecked) {
      setCurrentPx(0);
    }
  };

  const goToPrev = () => {
    setCurrentPx(currentPx + stepScrolImg <= 0 ? currentPx + stepScrolImg : 0);

    if (currentPx === 0 && isChecked) {
      setCurrentPx(maxWidth);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__main-container"
        style={{ width: `${numberShowImg}px` }}
      >
        <div className="Carousel__container">
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${currentPx}px)`,
              transition: `transform ${duration}ms ease-in-out`,
              gap: ITEMGAP,
              width: 'max-content',
            }}
          >
            {img.map((url, index) => (
              <li key={url}>
                <img src={url} alt={`${index + 1}`} width={itemWidth} />
              </li>
            ))}
          </ul>
        </div>
        <div className="Carousel__button-position">
          <button
            className={cn('Carousel__button', {
              'Carousel__button-active': currentPx < 0 || isChecked,
            })}
            type="button"
            onClick={goToPrev}
          >
            <img
              className="Carousel__arr-left"
              src="./img/arr-left.png"
              alt="left"
            />
          </button>
          <button
            className={cn('Carousel__button', {
              'Carousel__button-active': currentPx > maxWidth || isChecked,
            })}
            data-cy="next"
            type="button"
            onClick={goToNext}
          >
            <img
              className="Carousel__arr-right"
              src="./img/arr-right.png"
              alt="right"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
