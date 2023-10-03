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
  const [itemOnPage, setItemOnPage] = useState(0);

  const maxItems = (images.length - frameSize) * itemWidth;

  const getPrevImage = () => {
    setItemOnPage(Math.min(itemOnPage + itemWidth * step, 0));

    if (itemOnPage === 0) {
      setItemOnPage(maxItems);
    }
  };

  const getNextImage = () => {
    setItemOnPage(Math.max(itemOnPage - itemWidth * step, -maxItems));

    if (itemOnPage === -maxItems && infinite) {
      setItemOnPage(0);
    }
  };

  const containerWidth = frameSize * itemWidth;

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${containerWidth}px` }}
      >
        {images.map(image => (
          <li
            className="Carousel_element"
            key={image}
            style={{
              transform: `translateX(${itemOnPage}px)`,
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

      <button
        type="button"
        className="Carousel_btn"
        onClick={getPrevImage}
        disabled={!itemOnPage}
      >
        Prev
      </button>
      <button
        type="button"
        className="Carousel_btn"
        onClick={getNextImage}
        data-cy="next"
        disabled={itemOnPage === -maxItems && !infinite}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
