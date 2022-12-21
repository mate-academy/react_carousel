import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images, itemWidth, frameSize, step, animationDuration, infinite,
}) => {
  const [offset, setOffset] = useState(0);

  const div = {
    width: frameSize * itemWidth,

  };

  const imgs = {
    transform: `translateX(${offset}px)`,
    transition: `${animationDuration}ms`,
  };

  const handleLeftArrow = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + itemWidth * step;

      return Math.min(newOffset, 0);
    });
  };

  const handleRightArrow = () => {
    setOffset((currentOffset) => {
      let newOffset = currentOffset - itemWidth * step;

      const maxOffset = -(itemWidth * (images.length - step));

      if (infinite && newOffset === -(itemWidth * (images.length))) {
        newOffset = 0;

        return newOffset;
      }

      return Math.max(newOffset, maxOffset);
    });
  };

  return (
    <div className="Carousel" id="Carousel">
      <button type="button" className="arrow" onClick={handleLeftArrow}>
        Prev
      </button>
      <button
        type="button"
        data-cy="Next"
        className="arrow"
        onClick={handleRightArrow}
      >
        Next
      </button>
      <div id="viewport" style={div}>
        <ul className="Carousel__list">
          {images.map((image) => (
            <li key={image} className="Carousel__item">
              <img src={image} width={itemWidth} style={imgs} alt="1" />
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Carousel;
