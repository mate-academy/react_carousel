import React, { useEffect, useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  itemWidth,
  frameSize,
  animationDuration,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const gap = 5;
  const carouselWidth = frameSize * itemWidth;
  const left = -currentPosition * (itemWidth + gap * 2);
  const stepSize = step;
  const minPosition = 0;
  const maxPosition = images.length - frameSize;

  useEffect(() => {
    if (currentPosition > maxPosition) {
      setCurrentPosition(maxPosition);
    }
  }, [currentPosition, maxPosition]);

  return (
    <div className="Carousel">
      <button
        type="button"
        className={cn('Carousel__btn Carousel__btn--prev', {
          disabled: currentPosition <= 0,
        })}
        onClick={() => {
          const nextPosition = currentPosition - stepSize;

          setCurrentPosition(
            nextPosition >= minPosition ? nextPosition : minPosition,
          );
        }}
      ></button>
      <div
        className="Carousel-container"
        /* eslint-disable-next-line */
        style={{
          width: carouselWidth + frameSize * (gap * 2),
          height: itemWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            left: left,
            transition: `left ${animationDuration / 1000}s ease 0s`,
          }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img
                width={itemWidth}
                src={image}
                alt={image[index]}
                style={{ width: itemWidth, marginRight: gap, marginLeft: gap }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={cn('Carousel__btn Carousel__btn--next', {
          disabled: currentPosition >= images.length - frameSize,
        })}
        data-cy="next"
        onClick={() => {
          const nextPosition = currentPosition + stepSize;

          setCurrentPosition(
            nextPosition > maxPosition ? maxPosition : nextPosition,
          );
        }}
      ></button>
    </div>
  );
};

export default Carousel;
