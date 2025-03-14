import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
}) => {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setIndex(prev => Math.min(prev + step, maxIndex));
  };

  const handlePrev = () => {
    setIndex(prev => Math.max(prev - step, 0));
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `${frameSize * itemWidth}px`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ul
        style={{
          display: 'flex',
          gap: '10px',
          transform: `translateX(-${index * (itemWidth + 10)}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {images.map((src, i) => (
          <li key={i}>
            <img src={src} alt={`Slide ${i + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button
        onClick={handlePrev}
        disabled={index === 0}
        data-cy="prev"
        style={{
          position: 'absolute',
          left: 0,
          background: 'black',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: index === 0 ? 'not-allowed' : 'pointer',
        }}
      >
        &#9664;
      </button>

      <button
        onClick={handleNext}
        disabled={index >= maxIndex}
        data-cy="next"
        style={{
          position: 'absolute',
          right: 0,
          background: 'black',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: index >= maxIndex ? 'not-allowed' : 'pointer',
        }}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
