import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const maxItems = (images.length - frameSize) * itemWidth;
  const [itemOnPage, setItemOnPage] = useState(0);

  const handleScroll = (direction: 'next' | 'prev') => {
    const directionFactor = direction === 'next' ? -1 : 1;
    const nextPosition = itemOnPage + directionFactor * itemWidth * step;

    if (infinite) {
      if ((direction === 'next' && nextPosition >= -maxItems)
      || (direction === 'prev' && nextPosition <= 0)) {
        setItemOnPage(nextPosition);
      } else {
        setItemOnPage(direction === 'next' ? 0 : -maxItems);
      }
    } else {
      const canMoveNext = direction === 'next' && nextPosition <= 0;
      const canMovePrev = direction === 'prev' && nextPosition >= -maxItems;

      if (canMoveNext || canMovePrev) {
        setItemOnPage(nextPosition);
      }
    }
  };

  const containerWidth = frameSize * itemWidth;

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={{ width: `${containerWidth}px` }}>
        {images.map((image) => (
          <li
            className="Carousel_element"
            key={image}
            style={{
              transform: `translateX(${itemOnPage}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img src={image} alt={image} style={{ width: `${itemWidth}px` }} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="Carousel_btn"
        onClick={() => handleScroll('prev')}
        disabled={!infinite && itemOnPage >= 0}
      >
        Prev
      </button>
      <button
        type="button"
        className="Carousel_btn"
        onClick={() => handleScroll('next')}
        disabled={!infinite && Math.abs(itemOnPage) >= maxItems}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
