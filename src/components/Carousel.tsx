import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

export const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [current, setCurrent] = useState(0);
  const imageStyle = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };
  const listStyle = {
    width: `${frameSize * itemWidth}px`,
    transform: '',
    transitionDuration: `${animationDuration}s`,
  };
  const handlePrev = () => {
    if (!infinite) {
      if (current > 3) {
        listStyle.transform = `translate(${current * itemWidth - step * itemWidth}px, 0)`;
        setCurrent(old => old - 3);
      } else {
        listStyle.transform = 'translate(0, 0)';
        setCurrent(0);
      }
    }
  };

  const handleNext = () => {
    if (!infinite) {
      if (current < images.length - 3) {
        listStyle.transform = `translate(${current * itemWidth + step * itemWidth}px, 0)`;
        setCurrent(old => old + 3);
      }
    }
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={listStyle}>
        {images.map(image => (
          <li key={image}>
            <img className="image" style={imageStyle} src={image} alt={`${images.indexOf(image)}`} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrev}>Prev</button>
      <button type="button" onClick={handleNext}>Next</button>
    </div>
  );
};
