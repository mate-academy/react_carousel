import React, { useState } from 'react';
import './Carousel.scss';
import { Images } from '../Types/Images';
import { Params } from '../Types/Params';

interface Props {
  images: Images [],
  vizibleParam: Params,
}

const Carousel: React.FC<Props> = ({ images, vizibleParam }) => {
  const [itemsOnPage, setItemsOnPage] = useState(0);

  const {
    step, frameSize, itemWidth, animationDuration, infinite,
  } = vizibleParam;

  const hiddenImages = (images.length - frameSize) * itemWidth;

  const getPrevImage = () => {
    setItemsOnPage(Math.min(itemsOnPage + itemWidth * step, 0));

    if (itemsOnPage === 0) {
      setItemsOnPage(-hiddenImages);
    }
  };

  const getNextImage = () => {
    setItemsOnPage(Math.max(itemsOnPage - itemWidth * step, -hiddenImages));

    if (itemsOnPage === -hiddenImages && infinite) {
      setItemsOnPage(0);
    }
  };

  const maxItemsOnPage = (images.length - frameSize) * itemWidth;

  const containerWidth = frameSize * itemWidth;

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${containerWidth}px` }}
      >
        {images.map(image => (
          <li
            className="Carousel__item"
            key={image.id}
            style={{
              transform: `translateX(${itemsOnPage}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image.url}
              alt={`${image.id}`}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}

      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={getPrevImage}
          disabled={itemsOnPage === 0}
        >
          <span className="Carousel__vector">&lt;</span>
        </button>

        <button
          type="button"
          className="Carousel__button"
          data-cy="next"
          onClick={getNextImage}
          disabled={itemsOnPage === -maxItemsOnPage && !infinite}
        >
          <span className="Carousel__vector">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
