import React, { useRef, useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const carouselListRef = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);

  const displayedImagesAmount = 3;
  const imagesWidth = 130;
  const maxNextTransform =
    -(images.length - displayedImagesAmount) * imagesWidth;

  const handleNextClick = () => {
    if (carouselListRef.current && offset > maxNextTransform) {
      const newOffset = Math.max(offset - 390, maxNextTransform);

      carouselListRef.current.style.transform = `translateX(${newOffset}px)`;

      setOffset(newOffset);
    }
  };

  const handlePrevClick = () => {
    if (carouselListRef.current && offset < 0) {
      const newOffset = Math.min(offset + 390, 0);

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

      <button type="button" onClick={handlePrevClick}>
        Prev
      </button>
      <button type="button" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
