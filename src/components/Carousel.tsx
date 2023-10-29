import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

const ITEMS_GAP = 10;

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const listRenderedStyles = {
    width: frameSize * (itemWidth + ITEMS_GAP) - ITEMS_GAP,
    gridTemplateColumns: `repeat(${images.length}, ${itemWidth}px)`,
    transform: `translateX(${currentIndex * -(itemWidth + ITEMS_GAP)}px)`,
    gap: `${ITEMS_GAP}px`,
    transition: `width ${animationDuration}ms, transform ${animationDuration}ms`,
  };

  const imgRenderedStyles = {
    width: itemWidth,
    height: itemWidth,
  };

  const prevButtonClick = () => {
    const prev = document.getElementById('prev__button') as HTMLElement;
    const next = document.getElementById('next__button') as HTMLElement;

    if (next.classList.contains('disabled') && !infinite) {
      next.classList.remove('disabled');
    }

    let valToMove = step;

    if (currentIndex - step < 0) {
      if (infinite) {
        valToMove = -(images.length - step);

        if ((currentIndex - valToMove) + frameSize >= images.length) {
          valToMove = -(images.length - frameSize - currentIndex);
        }
      } else {
        valToMove = currentIndex;
      }
    }

    if (currentIndex - valToMove === 0 && !infinite) {
      if (!prev.classList.contains('disabled')) {
        prev.classList.add('disabled');
      }
    }

    setCurrentIndex(currentIndex - valToMove);

    return infinite;
  };

  const nextButtonClick = () => {
    const prev = document.getElementById('prev__button') as HTMLElement;
    const next = document.getElementById('next__button') as HTMLElement;

    if (prev.classList.contains('disabled') && !infinite) {
      prev.classList.remove('disabled');
    }

    let valToMove = step;

    if (currentIndex + frameSize + step > images.length) {
      if (infinite) {
        valToMove = -(images.length - step - frameSize + 1);
      } else {
        valToMove = images.length - currentIndex - frameSize;
      }
    }

    if (currentIndex + valToMove + frameSize === images.length && !infinite) {
      if (!next.classList.contains('disabled')) {
        next.classList.add('disabled');
      }
    }

    setCurrentIndex(currentIndex + valToMove);
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <ul className="Carousel__list" style={listRenderedStyles}>
          {images.map((image, index) => (
            <li className="Carousel__item" key={image}>
              <img
                src={image}
                alt={String(index)}
                style={imgRenderedStyles}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          id="prev__button"
          className={cn('Carousel__button', {
            disabled: (currentIndex === 0 && !infinite)
            || frameSize === images.length,
          })}
          type="button"
          onClick={prevButtonClick}
        >
          🡸 Prev
        </button>
        <button
          data-cy="next"
          id="next__button"
          className={cn('Carousel__button', {
            disabled: (currentIndex + frameSize === images.length && !infinite)
            || frameSize === images.length,
          })}
          type="button"
          onClick={nextButtonClick}
        >
          Next 🡺
        </button>
      </div>
    </div>
  );
};

export default Carousel;
