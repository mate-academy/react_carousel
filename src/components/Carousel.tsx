import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const IMAGE_GAP = 10;
const MIN_INDEX = 0;

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [imageIndex, setImageIndex] = useState(MIN_INDEX);

  const maxIndex = images.length - frameSize;

  const carouselListStyle = {
    gap: `${IMAGE_GAP}px`,
    transform: `translateX(${-imageIndex * (itemWidth + IMAGE_GAP)}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const handleNextButton = () => {
    const newIndex = imageIndex + step;

    if (newIndex > maxIndex) {
      setImageIndex(maxIndex);
    } else {
      setImageIndex(newIndex);
    }
  };

  const handlePrevButton = () => {
    const newIndex = imageIndex - step;

    if (newIndex < MIN_INDEX) {
      setImageIndex(MIN_INDEX);
    } else {
      setImageIndex(newIndex);
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        className={cn('Carousel__button Carousel__button--prev', {
          'Carousel__button--inactive': imageIndex === MIN_INDEX,
        })}
        onClick={imageIndex === MIN_INDEX ? undefined : handlePrevButton}
        aria-label="previous images"
      />

      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize + (frameSize - 1) * IMAGE_GAP}px` }}
      >
        <ul
          className="Carousel__list"
          style={carouselListStyle}
        >
          {images.map((image, index) => (
            <li key={image} className="Carousel__item">
              <img
                src={image}
                alt={String(index + 1)}
                className="Carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        className={cn('Carousel__button Carousel__button--next', {
          'Carousel__button--inactive': imageIndex === maxIndex,
        })}
        onClick={imageIndex === maxIndex ? undefined : handleNextButton}
        aria-label="next images"
      />
    </div>
  );
};

export default Carousel;
