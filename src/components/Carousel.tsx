import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

const Carousel: React.FC<Props> = ({ images }) => {
  const imagesToLi = (
    images.map((picture, index) => (
      <li className="Carousel__item">
        <img src={picture} alt={index.toString()} />
      </li>
    ))
  );

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {imagesToLi}
      </ul>

      <button type="button">Prev</button>
      <button type="button">Next</button>
    </div>
  );
};

export default Carousel;
