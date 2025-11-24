import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [shift, setShift] = useState(0);

  const totalWidth = itemWidth * images.length;
  const stepWidth = step * itemWidth;

  const handleNext = () => {
    if (shift + itemWidth * frameSize + stepWidth >= totalWidth) {
      if (infinite && shift === totalWidth - frameSize * itemWidth) {
        setShift(0);

        return;
      }

      setShift(totalWidth - frameSize * itemWidth);

      return;
    }

    setShift(prev => prev + stepWidth);
  };

  const handlePrev = () => {
    if (shift <= stepWidth) {
      if (infinite && shift === 0) {
        setShift(totalWidth - frameSize * itemWidth);

        return;
      }

      setShift(0);

      return;
    }

    setShift(prev => prev - stepWidth);
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${shift}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map((img, i) => (
          <li key={i + 1} style={{ width: `${itemWidth}px` }}>
            <img
              src={img}
              alt={i.toString()}
              width={itemWidth}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="button_container">
        <button onClick={handlePrev} type="button">
          Prev
        </button>
        <button data-cy="next" onClick={handleNext} type="button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
