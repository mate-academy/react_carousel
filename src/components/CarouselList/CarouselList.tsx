import React from 'react';
import './CarouselList.scss';

type Props = {
  images: string[];
  itemWidth: number;
  style: {
    transform: string,
    transition: string,
  }
};

export const CarouselList: React.FC<Props> = ({
  images,
  itemWidth,
  style: {
    transform,
    transition,
  },
}) => (
  <ul
    className="Carousel__list"
    style={{
      transform: `${transform}`,
      transition: `${transition}`,
    }}
  >
    {images.map((image, index) => (
      <li
        // eslint-disable-next-line react/no-array-index-key
        key={`${image}+${index}}`}
        className="Carousel__item"
        style={{
          width: `${itemWidth}px`,
        }}
      >
        <img
          src={image}
          alt={String(index + 1)}
        />
      </li>
    ))}
  </ul>
);
