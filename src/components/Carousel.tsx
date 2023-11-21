import React from 'react';
// import { useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC = () => (
  // const [activeIndex, setActiveIndex] = useState(0);
  <div className="Carousel">
    <ul className="Carousel__list">
      <li className="Carousel__item">
        <img
          className="Carousel__img"
          src="./img/1.png"
          alt="1"
        />
      </li>
      <li className="Carousel__item">
        <img
          className="Carousel__img"
          src="./img/2.png"
          alt="2"
        />
      </li>
      <li className="Carousel__item">
        <img
          className="Carousel__img"
          src="./img/3.png"
          alt="3"
        />
      </li>
      <li className="Carousel__item">
        <img
          className="Carousel__img"
          src="./img/4.png"
          alt="4"
        />
      </li>
    </ul>

    <div className="Carousel__buttons">
      <button
        className="Carousel__button"
        type="button"
      >
        {'<<'}
      </button>
      <button
        className="Carousel__button"
        type="button"
      >
        {'>>'}
      </button>
    </div>

  </div>
);

export default Carousel;
