import React, { useState } from 'react';

import './Carousel.scss';

interface Props {
  images: string[]; // массив URL-адресов изображений
  itemWidth: number; // ширина каждого элемента карусели, значение по умолчанию будет установлено позже
  frameSize: number; // количество изображений, отображаемых одновременно
  step: number; // количество изображений, прокручиваемых за один клик
  animationDuration: number;
  infinite: boolean; // бесконечная карусель
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 1,
  animationDuration = 300,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselWidth = itemWidth * frameSize;

  const carouselStyle = {
    width: `${carouselWidth}px`,
    overflow: 'hidden',
  };

  const handleNext = () => {
    setCurrentIndex((currentI) => Math.min(currentI + step,
      images.length - frameSize));
  };

  const handlePrev = () => {
    setCurrentIndex((currentI) => Math.max(currentI- step, 0));
  };

  let visibleImages;

  if (infinite) {
    visibleImages = [
      ...images.slice(-step),
      ...images,
      ...images.slice(0, step),
    ];
  } else {
    visibleImages = images;
  }

  return (
    <div className="Carousel" style={carouselStyle}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${
            (currentIndex + (infinite ? step : 0)) * itemWidth
          }px)`,
          transition: `transform ${animationDuration}ms ease-out`,
        }}
      >
        {visibleImages.map((img) => (
          <li key={img} style={{ width: `${itemWidth}px` }}>
            <img src={img} alt="Carousel item" style={{ width: '100%' }} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>

      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
