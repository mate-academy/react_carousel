import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  itemWidth: number,
};

const Carousel: React.FC<Props> = ({ images, step, itemWidth }) => {
  const [currentPos, setCurrentPos] = useState(0);

  const imagesToLi = (
    images.map((picture, index) => (
      <li className="Carousel__item">
        <img className="Carousel__image" src={picture} alt={index.toString()} />
      </li>
    ))
  );

  const carouselList = document.querySelector<HTMLElement>('.Carousel__list');

  if (carouselList) {
    carouselList.style.transform = `tranlateX(${currentPos * itemWidth}px)`;
  }

  const moveForward = () => {
    if (currentPos + step < images.length - 1) {
      setCurrentPos((prevPos) => prevPos + step);
    }
  };

  const moveBackward = () => {
    if (currentPos > 0) {
      setCurrentPos((prevPos) => prevPos - step);
    }
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={{ transform: `translateX(-${currentPos * itemWidth}px)` }}>
        {imagesToLi}
      </ul>

      <button
        type="button"
        disabled={currentPos === 0}
        onClick={moveBackward}
      >
        Prev
      </button>
      <button type="button" onClick={moveForward}>Next</button>
    </div>
  );
};

export default Carousel;
