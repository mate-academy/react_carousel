import React, { useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC = () => {
  const [currentImg, setCurrentImg] = useState(1);

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        <li><img src={`./img/${currentImg}.png`} alt={`${currentImg}`} /></li>
      </ul>

      <ul className="Carousel__list">
        <button
          type="button"
          className="Carousel__btn"
          onClick={() => currentImg > 1 && setCurrentImg(currentImg - 1)}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__btn"
          onClick={() => currentImg < 10 && setCurrentImg(currentImg + 1)}
        >
          Next
        </button>
      </ul>
    </div>
  );
};

export default Carousel;
