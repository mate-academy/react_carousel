import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  frameSize?: number;
  step?: number;
  itemWidth?: number
  animationDuration?: number
  infinite?: boolean
}

const Carousel: React.FC <Props> = ({
  images,
  frameSize = 3,
  step = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false
  }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {

    if (infinite && currentIndex + step > images.length - 1) {
      setCurrentIndex(0);
      return;
    } else if (currentIndex + step > images.length - 1) {

      return;
    }

    setCurrentIndex(currentIndex + step);
  }

   const handlePrev = () => {

      if (infinite && currentIndex - step < 0) {
      setCurrentIndex(images.length-1);
      return;
    } else if (currentIndex - step < 0) {

      return;
    }

    setCurrentIndex(currentIndex - step);
  }

  return (

  <div
  className="Carousel"
  style = {{ width: `${frameSize * itemWidth}px`,
    '--item-width': `${itemWidth}px`,
    } as React.CSSProperties}
    >

    <ul
    className="Carousel__list"
    style = {{transform: `translateX(-${currentIndex * itemWidth}px)`,
    transition: `transform ${animationDuration}ms`
    }}
    >

      {images.map((image, index) => (
       <li key ={index}>
        <img src={image} alt ={image} width={itemWidth}/>
        </li>

      ))}

    </ul>

    <button
    type="button"
    onClick = {handlePrev}
    >Prev</button>

    <button
    data-cy="next"
    type="button"
    onClick = {handleNext}
    >Next</button>

  </div>

  )
};

export default Carousel;
