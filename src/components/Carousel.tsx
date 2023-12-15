import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = images.length;

  const handleNext = () => {
    const newIndex = currentIndex + step;
    const maxIndex = totalImages - frameSize;

    setCurrentIndex(
      infinite ? newIndex % totalImages : Math.min(newIndex, maxIndex),
    );
  };

  const handlePrev = () => {
    const newIndex = currentIndex - step;

    setCurrentIndex(
      infinite ? (newIndex + totalImages) % totalImages : Math.max(newIndex, 0),
    );
  };

  const containerStyle: React.CSSProperties = {
    width: itemWidth * frameSize + (frameSize - 1) * 10,
  };

  const listStyle: React.CSSProperties = {
    transition: `transform ${animationDuration}ms ease-in-out`,
    transform: `translateX(-${currentIndex * (itemWidth + 10)}px)`,
  };

  return (
    <>
      <div className="Carousel" style={containerStyle}>
        <ul className="Carousel__list" style={listStyle}>
          {images.map((image, index) => (
            <li key={image} style={{ width: itemWidth, marginRight: 10 }}>
              <img
                src={image}
                alt={`img-${index}`}
                width={itemWidth}
                height={130}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="prev"
        type="button"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={handleNext}
        disabled={currentIndex + frameSize >= totalImages}
      >
        Next
      </button>
    </>
  );
};

export default Carousel;
