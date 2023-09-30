import React from 'react';

import './CarouselList.scss';

type Props = {
  images: string[];
};

export const CarouselList: React.FC<Props> = ({ images }) => (
  <ul className="Carousel__list">
    {images.map(image => (
      <li className="Carousel__item" key={image}>
        <img
          src={image}
          alt={image}
          className="Carousel__image"
        />
      </li>
    ))}
  </ul>
);
