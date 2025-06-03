import React, { useState } from 'react';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    let newIndex = currentIndex + step;

    if (newIndex > images.length - frameSize) {
      newIndex = infinite ? 0 : images.length - frameSize;
    }

    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    let newIndex = currentIndex - step;

    if (newIndex < 0) {
      newIndex = infinite ? images.length - frameSize : 0;
    }

    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel" style={{ width: itemWidth * frameSize }}>
      <button data-cy="prev" onClick={handlePrev}>
        Prev
      </button>
      <ul>
        {images.map((src, idx) => (
          <li
            key={idx}
            style={{
              display:
                idx >= currentIndex && idx < currentIndex + frameSize
                  ? 'inline-block'
                  : 'none',
            }}
          >
            <img
              src={src}
              alt={`image-${idx}`}
              width={itemWidth}
              style={{ transitionDuration: `${animationDuration}ms` }}
              data-cy="carousel-image"
            />
          </li>
        ))}
      </ul>
      <button data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
