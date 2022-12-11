/* eslint-disable no-console */
import React, { useEffect } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  // infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  // infinite,
}) => {
  let itemPosition = 0;

  const handlePrevClick = () => {
    console.log(itemPosition);
    const carousel = document
      .querySelector('.Carousel__list') as HTMLBodyElement;

    // const minItemPosition = step;

    switch (true) {
      case itemPosition === 0:
        return;
      case itemPosition >= step:
        itemPosition -= step;

        carousel.style.transform
        = `translateX(${-itemWidth * (itemPosition)}px)`;
        break;
      default:
        itemPosition = 0;

        carousel.style.transform = 'translateX(0}px)';
        break;
    }
  };

  const handleNextClick = () => {
    console.log(itemPosition);
    const carousel = document
      .querySelector('.Carousel__list') as HTMLBodyElement;

    const maxItemPosition = images.length - step - 1;

    switch (true) {
      case itemPosition >= images.length:
        return;
      case itemPosition + step < maxItemPosition:
        itemPosition += step;

        carousel.style.transform
        = `translateX(${-itemWidth * (itemPosition)}px)`;
        break;
      default:
        itemPosition = maxItemPosition;

        carousel.style.transform
        = `translateX(${-itemWidth * (images.length - frameSize)}px)`;
        break;
    }
  };

  useEffect(() => {
    const CarouselList = document
      .querySelector('.Carousel') as HTMLBodyElement;

    CarouselList.style.width = `${itemWidth * frameSize}px`;
  }, [itemWidth, frameSize]);

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {
          images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={index.toString()}
                width={itemWidth}
                className="Carousel__image"
              />
            </li>
          ))
        }
      </ul>

      <button
        type="button"
        onClick={() => handlePrevClick()}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => handleNextClick()}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
