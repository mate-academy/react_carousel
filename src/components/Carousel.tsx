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

const MIN_INDEX = 0;
const IMAGE_GAP = 10;

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

  const handleRightButton = () => {
    const newIndex = imageIndex + step;

    if (newIndex > maxIndex) {
      setImageIndex(maxIndex);
    } else {
      setImageIndex(newIndex);
    }
  };

  const handleLeftButton = () => {
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
        className={cn('Carousel__button Carousel__button--left', {
          'Carousel__button--inactive': imageIndex === MIN_INDEX,
        })}
        onClick={imageIndex === MIN_INDEX ? undefined : handleLeftButton}
        aria-label="previous images"
      />

      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize + (frameSize) * IMAGE_GAP}px` }}
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
                width={itemWidth}
                className="Carousel__image"
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        className={cn('Carousel__button Carousel__button--right', {
          'Carousel__button--inactive': imageIndex === maxIndex,
        })}
        onClick={imageIndex === maxIndex ? undefined : handleRightButton}
        aria-label="next images"
      />
    </div>
  );
};

export default Carousel;
