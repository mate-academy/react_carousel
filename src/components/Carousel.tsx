import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const length = images.length;

  const [nextImages, setNextImages] = useState(0);
  const [imagesToShow, setImagesToShow] = useState(length - frameSize);

  const imgGap = 20;
  const gapsTranslate = nextImages === 0 ? 0 : imgGap;

  const handlePrevImg = () => {
    setNextImages(prevImages => {
      if (prevImages - step >= 0) {
        return prevImages - step;
      }

      return 0;
    });
  };

  const handleNextImg = () => {
    setNextImages(prevImages => {
      if (prevImages + step <= imagesToShow) {
        return prevImages + step;
      }

      const imagesLeft = imagesToShow - prevImages;

      return prevImages + imagesLeft;
    });
  };

  const timerId = useRef(0);

  useEffect(() => {
    const newImagesToShow = length - frameSize;

    setImagesToShow(newImagesToShow);
    clearTimeout(timerId.current);

    if (infinite) {
      timerId.current = +setTimeout(() => {
        setNextImages(prevImages => {
          if (prevImages === newImagesToShow) {
            return 0;
          }

          if (prevImages + step <= newImagesToShow) {
            return prevImages + step;
          }

          const imagesLeft = newImagesToShow - prevImages;

          return prevImages + imagesLeft;
        });
      }, animationDuration);
    } else {
      if (imagesToShow === nextImages) {
        setNextImages(newImagesToShow);
      }
    }
  }, [
    frameSize,
    infinite,
    length,
    imagesToShow,
    nextImages,
    step,
    animationDuration,
  ]);

  return (
    <div className="Carousel">
      <button
        className="button"
        type="button"
        onClick={handlePrevImg}
        disabled={nextImages === 0}
      >
        Prev
      </button>

      <div
        className="Carousel__content"
        style={{ width: `${(itemWidth + imgGap) * frameSize - imgGap}px` }}
      >
        <ul
          className={cn('Carousel__list', [
            `Carousel__list--next--${nextImages}`,
          ])}
          style={{
            transition: `transform ${animationDuration}ms`,
            transform: `translate(calc(-1 * ${nextImages * (itemWidth + gapsTranslate)}px))`,
            gap: `${imgGap}px`,
          }}
        >
          {images.map((imgUrl, ind) => (
            <li className="Carousel__item" key={ind}>
              <img
                className="Carousel__img"
                src={imgUrl}
                alt={`${ind}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="button"
        type="button"
        onClick={handleNextImg}
        disabled={nextImages === imagesToShow}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};
