import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => (
  <div className="Carousel">
    <div className="Carousel__container">
      <ul className="Carousel__list">
        {images.map(image => (
          <li key={image}>
            <img src={image} alt="1" />
          </li>
        ))}
      </ul>
    </div>

    <div className="Carousel__butttons">
      <button type="button">Prev</button>
      <button type="button">Next</button>
    </div>
  </div>
);

export default Carousel;
