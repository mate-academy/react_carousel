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
  const [listStyle, setListStyle] = useState({
    width: `${frameSize * itemWidth}px`,
    // transform: 'translate(0, 0)',
    margineLeft: '0',
    transitionDuration: `${animationDuration}s`,
  });
  const imageStyle = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };

  const handlePrev = () => {
    console.log(listStyle.margineLeft);

    if (!infinite) {
      if (current > 3) {
        setListStyle(prevStyle => ({
          ...prevStyle,
          margineLeft: `${current * itemWidth - step * itemWidth}px`,
        }));
        setCurrent(old => old - 3);
      } else {
        setListStyle(prevStyle => ({
          ...prevStyle,
          margineLeft: '0',
        }));
        setCurrent(0);
      }
    }
  };

  const handleNext = () => {
    console.log(listStyle.margineLeft);

    if (!infinite) {
      if (current < images.length - 3) {
        setListStyle(prevStyle => ({
          ...prevStyle,
          margineLeft: `${current * itemWidth + step * itemWidth}px`,
        }));
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
