import React from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[],
  indexVisibleImages: number[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  onPageChange: (indexVisibleImages: number[]) => void,
};

const Carousel: React.FC<Props> = ({
  images,
  indexVisibleImages,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  onPageChange,
}) => {
  const gapBetweenPictures = 10;
  const fullVisibleWidth
  = (itemWidth * frameSize) + (frameSize * gapBetweenPictures);

  const handleClickToPrev = (prevIndexOfImages: number[]) => {
    if (prevIndexOfImages[0] < 0) {
      onPageChange(Array.from({ length: frameSize }, (_, i) => i));
    }

    if (prevIndexOfImages[0] >= 0) {
      onPageChange(prevIndexOfImages);
    }
  };

  const handleClickToNext = (nextIndexOfImages: number[]) => {
    if (nextIndexOfImages[nextIndexOfImages.length - 1] > images.length - 1) {
      onPageChange(Array.from({ length: frameSize },
        (_, i) => images.length - frameSize + i));
    }

    if (nextIndexOfImages[nextIndexOfImages.length - 1] <= images.length - 1) {
      onPageChange(nextIndexOfImages);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${fullVisibleWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          gap: `${gapBetweenPictures}px`,
          transform: indexVisibleImages[frameSize - 1] <= images.length - 1
            ? `translateX(-${(indexVisibleImages[0] * 100) / step}%)`
            : 'none',
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img
              src={image}
              alt={String(index)}
            />
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button
          type="button"
          onClick={() => handleClickToPrev(
            indexVisibleImages.map(i => i - step),
          )}
          className={cn('button', { disabled: indexVisibleImages[0] === 0 })}
        >
          «
        </button>

        <button
          data-cy="next"
          type="button"
          onClick={() => handleClickToNext(
            indexVisibleImages.map(i => i + step),
          )}
          className={cn('button', {
            disabled: indexVisibleImages[indexVisibleImages.length - 1]
              === images.length - 1,
          })}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Carousel;
