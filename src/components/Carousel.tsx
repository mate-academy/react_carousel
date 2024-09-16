import React from 'react';
import './Carousel.scss';

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={`${index + 1}`} />
          </li>
        ))}
      </ul>

      <button type="button">Prev</button>
      <button type="button">Next</button>
    </div>
  );
};

export default Carousel;
