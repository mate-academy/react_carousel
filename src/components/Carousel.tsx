import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = currentIndex + step;

    setCurrentIndex(infinite
      ? newIndex % images.length
      : Math.min(newIndex, images.length - frameSize));
  };

  const prevSlide = () => {
    const newIndex = currentIndex - step;

    setCurrentIndex(infinite
      ? (newIndex + images.length) % images.length
      : Math.max(newIndex, 0));
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={{ transform: `translateX(-${currentIndex * itemWidth}px)`, transitionDuration: `${animationDuration}ms` }}>
        {images.map((imageUrl, index) => (
          <li key={imageUrl} style={{ width: `${itemWidth}px` }}>
            <img src={imageUrl} alt={String(index)} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={prevSlide} data-cy="prev">Prev</button>
      <button type="button" onClick={nextSlide} data-cy="next">Next</button>
    </div>
  );
};

export default Carousel;
