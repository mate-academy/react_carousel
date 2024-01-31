import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite
}) => {
  return (
    <div className="Carousel field">
      <div className="Carousel__list">
        {images.map(image => {
          return (
            <li key={image} className="Carousel__items">
              <img
                style={{ width: 130 }}
                src={image}
                alt="Emoji"
                className="Carousel__image"
              />
            </li>
          )
        })}
      </div>
    </div>
  );
}


