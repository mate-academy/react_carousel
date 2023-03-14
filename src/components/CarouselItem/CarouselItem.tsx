import React from 'react';
import './CarouselItem.scss';

interface Props {
  imageSrc: string,
}

export const CarouselItem:React.FC<Props> = ({ imageSrc }) => {
  return (
    <li className="carousel-item">
      <img
        src={`${imageSrc}`}
        alt={`${imageSrc.slice(5, -4)}`}
        className="carousel-img"
      />
    </li>
  );
};
