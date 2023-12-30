import React, { useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC = () => {
  const [currentImg, setCurrentImg] = useState(1);
  const [step, setStep] = useState(1);

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        <li><img src={`./img/${currentImg}.png`} alt={`${currentImg}`} /></li>
      </ul>

      <ul className="Carousel__list">
        <button
          type="button"
          className="Carousel__btn"
          onClick={() => currentImg > 1 && setCurrentImg(currentImg - step)}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__btn"
          onClick={() => currentImg < 10 && setCurrentImg(currentImg + step)}
        >
          Next
        </button>
      </ul>

      <input
        type="number"
        className="Carousel__inp"
        defaultValue={3}
        min={1}
        max={10}
        onChange={() => setStep(2)}
      />
    </div>
  );
};

export default Carousel;
