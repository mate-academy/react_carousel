import React from 'react';
import './Carousel.scss';

type Props = {
  arrOfCarousel: string[],
};

const Carousel: React.FC<Props> = ({ arrOfCarousel = [] }) => (
  <ul className="Carousel__list">
    {arrOfCarousel.map((image) => {
      return (
        <li>
          <img
            src={image}
            alt="1"
            className="Carousel__ image"
          />

        </li>
      );
    })}
  </ul>

);

export default Carousel;
