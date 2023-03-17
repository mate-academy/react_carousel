import React from 'react';
import './Carousel.scss';

const Carousel: React.FC = () => (
  <div className="Carousel">
    <div className="Carousel__frame">
      <ul className="Carousel__ribbon">
        <li><img src="./img/1.png" alt="1" className="Carousel__image" /></li>
        <li><img src="./img/1.png" alt="2" className="Carousel__image" /></li>
        <li><img src="./img/1.png" alt="3" className="Carousel__image" /></li>
        <li><img src="./img/1.png" alt="4" className="Carousel__image" /></li>
      </ul>
    </div>

    <div className="Carousel__controls">
      <button type="button" className="Carousel__button">
        &#8592;
      </button>
      <button type="button" className="Carousel__button">
        &#8594;
      </button>
    </div>
  </div>
);

export default Carousel;
