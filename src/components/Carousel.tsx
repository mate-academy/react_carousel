import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [leftMargin, setLeftMargin] = useState(0);
  const [itemsPassed, setItemsPassed] = useState(0);

  const previousImages = () => {
    let itemsToUpdate = 0;

    if (infinite && (itemsPassed <= 0)) {
      itemsToUpdate = images.length - frameSize;
      setItemsPassed(itemsPassed + itemsToUpdate);
      setLeftMargin(leftMargin - (itemWidth * itemsToUpdate));
    } else {
      for (let i = 0; i < step; i += 1) {
        if (itemsPassed - i > 0) {
          itemsToUpdate += 1;
        }
      }

      setItemsPassed(itemsPassed - itemsToUpdate);
      setLeftMargin(leftMargin + (itemWidth * itemsToUpdate));
    }
  };

  const nextImages = () => {
    if (infinite && itemsPassed >= images.length - frameSize) {
      setItemsPassed(0);
      setLeftMargin(0);
    } else {
      let itemsToUpdate = 0;

      for (let i = 0; i < step; i += 1) {
        if (itemsPassed + i < images.length - frameSize) {
          itemsToUpdate += 1;
        }
      }

      setItemsPassed(itemsPassed + itemsToUpdate);
      setLeftMargin(leftMargin - (itemWidth * itemsToUpdate));
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        {images.map((image, imageIndex) => (
          <li
            className="Carousel__list-item"
            key={image}
            style={{
              transform: `translateX(${leftMargin}px)`,
              transition: `all ${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              width={`${itemWidth}px`}
              alt={`${imageIndex + 1} ${step + frameSize + animationDuration}`}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__box">
        <button
          className="Carousel__button"
          type="button"
          onClick={previousImages}
          disabled={!infinite && (itemsPassed === 0)}
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={nextImages}
          disabled={!infinite && (itemsPassed >= images.length - frameSize)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
