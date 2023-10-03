import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [itemsOnPage, setitemsOnPage] = useState(0);

  const maxItems = (images.length - frameSize) * itemWidth;

  const getPrevImage = () => {
    setitemsOnPage(Math.min(itemsOnPage + itemWidth * step, 0));

    if (itemsOnPage === 0) {
      setitemsOnPage(maxItems);
    }
  };

  const getNextImage = () => {
    setitemsOnPage(Math.max(itemsOnPage - itemWidth * step, -maxItems));

    if (itemsOnPage === -maxItems && infinite) {
      setitemsOnPage(0);
    }
  };

  const frameWith = frameSize * itemWidth;

  return (
    <div className="carousel">
      <ul
        className="carousel__list"
        style={{ width: `${frameWith}px` }}
      >
        {images.map(image => (
          <li
            className="carousel_item"
            key={image}
            style={{
              transform: `translateX(${itemsOnPage}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={`${image}`}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="carousel__buttons">
        <button
          type="button"
          className="carousel__button"
          onClick={getPrevImage}
          disabled={!itemsOnPage}
        >
          Prev
        </button>

        <button
          type="button"
          className="carousel__button"
          onClick={getNextImage}
          data-cy="next"
          disabled={itemsOnPage === -maxItems && !infinite}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
