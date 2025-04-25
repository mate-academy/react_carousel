import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
}

const Carousel: React.FC<CarouselProps> = ({ images, step, frameSize, itemWidth, animationDuration, infinite }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function next() {
    setCurrentIndex(prevIndex => {
      const maxIndex = images.length - frameSize;

      if (infinite) {
        return (prevIndex + step) % images.length;
      }

      return Math.min(prevIndex + step, maxIndex);
    });
  };

  function prev() {
    setCurrentIndex(prevIndex => {
      if (infinite){
        return (prevIndex - step + images.length) % images.length;
      }

      return Math.max(prevIndex - step, 0);
    });
  };

  return (
  <div className="Carousel">
    <div
    className="Carousel__frame"
    style={{ width: `${frameSize * itemWidth}px`, overflow: 'hidden' }}
    >
    <ul className="Carousel__list" style={{
    transform: `translateX(-${currentIndex * itemWidth}px)`,
    transition: `transform ${animationDuration}ms ease`
    }}>
    {images.map((src, index) => (
    <li key={index}>
      <img src={src} alt={`Image ${index + 1}`} width={itemWidth} />
    </li>
    ))}
    </ul>
    </div>

    <button onClick={prev} type="button" data-cy="prev">Prev</button>
    <button data-cy="next" onClick={next} type="button">Next</button>
  </div>
)};

export default Carousel;
