import React from 'react';
import { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(infinite ? step : 0);
  // const [currentImages, setCurrentImages] = useState(images);
  const transform = `translateX(${-currentIndex * itemWidth + -currentIndex * 10}px)`;
  const transition = `transform ${animationDuration}ms ease-in-out`;

  // const imagesCopy = [...images];

  // if (infinite) {
  //   imagesCopy.unshift(...images.slice(-step));
  //   imagesCopy.push(...images.slice(0, step));
  // }

  const handleNext = () => {
    if (infinite) {
      setCurrentIndex(
        currentIndex + step > images.length ? step : currentIndex + step,
      );
    } else {
      setCurrentIndex(
        currentIndex + 2 * step > images.length
          ? images.length - step
          : currentIndex + step,
      );
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setCurrentIndex(
        currentIndex === 0 || currentIndex === -2
          ? images.length - step
          : currentIndex - step,
      );
    } else {
      setCurrentIndex(currentIndex - step < 0 ? 0 : currentIndex - step);
    }
  };

  const gap = 10;

  return (
    <div
      className="Carousel"
      style={{ width: frameSize * itemWidth + gap * (frameSize - 1) + 'px' }}
    >
      <ul
        className="Carousel__list"
        style={{ transform: transform, transition: transition }}
      >
        {images.map((image: string) => {
          const alt = image.slice(6, -4);

          return (
            <li key={image}>
              <img
                src={image}
                alt={alt}
                className="Carousel__image"
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          );
        })}
      </ul>
      <div className="Carousel__button">
        <button
          type="button"
          className="Carousel__button--prev"
          onClick={handlePrev}
        ></button>
        <button
          type="button"
          className="Carousel__button--next"
          data-cy="next"
          onClick={handleNext}
        ></button>
        {/* <button type="button" className='Carousel__button--prev' disabled={currentIndex === 0} onClick={handlePrev}></button>
      <button type="button" className='Carousel__button--next' disabled={currentIndex === images.length - step} data-cy='next' 
      onClick={handleNext}></button> */}
      </div>
    </div>
  );
};

export default Carousel;

// const [currentIndex, setCurrentIndex] = useState(0);
// const transform = `translateX(${-currentIndex * itemWidth + (-currentIndex * 10)}px)`;
// const transition = `transform ${animationDuration}ms ease-in-out`;
// console.log(currentIndex);
// return (
// <div className="Carousel" style={{width: frameSize * itemWidth + 25}}>
//   <ul className="Carousel__list" style={{ transform: transform, transition: transition}}>
//     {images.map((image: string) => {
//       const alt = image.slice(6, -4);
//       return(
//       <li key={image}>
//       <img src={image} alt={alt} className='Carousel__image' style={{width: itemWidth}}/>
//     </li>
//     )})}
//   </ul>
//   <div className='Carousel__button'>
//     <button type="button" className='Carousel__button--prev' disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - step < 0 ? 0 : currentIndex - step)}></button>
//     <button type="button" className='Carousel__button--next' disabled={currentIndex === images.length - step} data-cy='next' onClick={() => setCurrentIndex (currentIndex + 2 * step > images.length ? images.length - step : currentIndex + step)}></button>
//   </div>
// </div>
// )};

// export default Carousel;
