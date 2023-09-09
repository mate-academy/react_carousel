import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  translate: number,
}

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  animationDuration,
  translate,
}) => {
  const imageStyle = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };

  const containterStyle = {
    width: `${frameSize * itemWidth}px`,
  };

  const listStyle = {
    transform: `translateX(-${translate}%)`,
    width: `${itemWidth * frameSize * (images.length / frameSize)}px`,
    transition: `transform ${animationDuration}ms`,
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={containterStyle}>
        <ul className="Carousel__list" style={listStyle}>
          {images.map((image, index) => (
            <li key={image}>
              <img src={image} alt={String(index + 1)} style={imageStyle} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
