import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
}

const GAP = 10;

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  step,
  itemWidth,
  animationDuration,
}) => {
  const carouselWidth = frameSize * itemWidth + (frameSize - 1) * GAP;
  const [firstIndex, setFirstIndex] = useState(0);
  const [transition, setTransition] = useState('transform 1000ms ease-in-out');

  const handleNext = () => {
    setFirstIndex(firstInd =>
      Math.min(firstInd + step, images.length - frameSize),
    );
    setTransition(`transform ${animationDuration}ms ease-in-out`);
  };

  const handlePrev = () => {
    setFirstIndex(firstInd => Math.max(0, firstInd - step));
    setTransition(`transform ${animationDuration}ms ease-in-out`);
  };

  return (
    <div className="Carousel">
      <div className="Carousel-container" style={{ width: carouselWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${firstIndex * (itemWidth + GAP)}px)`,
            gap: GAP,
            transition,
          }}
        >
          {images.map((image, index) => 
            <li className="Carousel__list-item" key={image}>
              <img src={image} alt={`${image[index]}`} width={itemWidth} />
            </li>
          )}
        </ul>
      </div>

      <button type="button" onClick={handlePrev} disabled={firstIndex === 0}>
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={handleNext}
        disabled={firstIndex >= images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
