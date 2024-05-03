import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images}) => (
  <div className="Carousel">
    <div className="Carousel__container">
      <ul className="Carousel__list">
        {images.map(image => (
          <li key={images.indexOf(image)}>
            <img src={`${image}`} alt="1" />
          </li>
        ))}
      </ul>
    </div>
    <input type="number" />
    <button type="button">Prev</button>
    <button type="button">Next</button>
  </div>
);

export default Carousel;
