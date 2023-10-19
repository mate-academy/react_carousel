import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
  currentImage: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  animationDuration,
  currentImage,
}) => (
  <div className="Carousel" style={{ width: frameSize * itemWidth }}>
    <ul className="Carousel__list">
      {images.map((image) => (
        <li
          style={{
            transform: `translateX(${-(itemWidth * currentImage)}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
          key={image}
          className="Carousel__item"
        >
          <img
            style={{ width: itemWidth }}
            className="Carousel__image"
            src={image}
            alt="1"
          />
        </li>
      ))}
    </ul>
  </div>
);

export default Carousel;
