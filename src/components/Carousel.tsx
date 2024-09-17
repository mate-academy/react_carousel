import React, { useRef, useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC<{
  images: string[];
  step: number;
  itemWidth: number;
}> = ({ images, step, itemWidth }) => {
  const carouselListRef = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);

  const gap = 20;
  const maxNextTransform = -(images.length - step) * (itemWidth + gap);

  const handleNextClick = () => {
    if (carouselListRef.current && offset > maxNextTransform) {
      const newOffset = Math.max(
        offset - step * (itemWidth + gap),
        maxNextTransform,
      );

      carouselListRef.current.style.transform = `translateX(${newOffset}px)`;

      setOffset(newOffset);
    }
  };

  const handlePrevClick = () => {
    if (carouselListRef.current && offset < 0) {
      const newOffset = Math.min(offset + step * (itemWidth + gap), 0);

      carouselListRef.current.style.transform = `translateX(${newOffset}px)`;

      setOffset(newOffset);
    }
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list" ref={carouselListRef}>
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={`${index + 1}`} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handlePrevClick}
        className={`Carousel__button Carousel__button--prev ${offset === 0 ? 'Carousel__button--disabled' : ''}`}
      >
        &#9664;
      </button>
      <button
        type="button"
        onClick={handleNextClick}
        className={`Carousel__button Carousel__button--next ${offset === maxNextTransform ? 'Carousel__button--disabled' : ''}`}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
