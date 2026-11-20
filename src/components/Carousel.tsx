import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite?: boolean,
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite = false,
}) => {

  const handleNext = (max: number) => {
    if (currentIndex + step > max) {
      if (infinite) {
        setCurrentIndex(0);
      }
      else {
        setCurrentIndex(max);
      }
    }
    else {
      setCurrentIndex(currentIndex + step);
    }
  }

  const handlePrev = (min: number, max: number) => {
    if (currentIndex - step < min) {
      if (currentIndex === 0 && infinite) {
        setCurrentIndex(max);
      }
      else {
        setCurrentIndex(min);
      }
    }
    else {
      setCurrentIndex(currentIndex - step);
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = images.length - frameSize;
  const minIndex = 0;

  console.log(currentIndex);

  // const imagesToDisplay: typeof images = images.slice(currentIndex, currentIndex + frameSize);

  return ( 
    <div 
      className="Carousel"
    >
    <button 
      type="button"
      disabled={!infinite && currentIndex === 0}
      onClick={() => handlePrev(minIndex, maxIndex)}
    >
      ‹
    </button>

    <div 
      className="Carousel__frame"
      style={{width: itemWidth * frameSize}}
    >
      <ul 
        className="Carousel__list"
        style={{
          transform: `translateX(${-(currentIndex * itemWidth)}px)`,
          transitionDuration: `${animationDuration}ms`,
        }}
        >
        {images.map((image, index) => {
          return (
            <li
              key={index}
              >
              <img
                width={itemWidth}
                src={image} 
                alt={`${index + 1}`}
              />
            </li>
          )
        })}
      </ul>
    </div>

    <button
      data-cy="next" 
      type="button"
      disabled={!infinite && currentIndex === maxIndex}
      onClick={() => handleNext(maxIndex)}
    >
      ›
    </button>
  </div>
  )
};

export default Carousel;
