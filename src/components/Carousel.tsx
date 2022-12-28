import React, { useMemo, useState } from 'react';
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
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [offset, setOffset] = useState(0);
  const [isAbleToGoRight, setisAbleToGoRight] = useState(false);
  const [isAbleToGoLeft, setisAbleToGoLeft] = useState(true);

  const div = {
    width: frameSize * itemWidth,
  };

  const imgs = {
    transform: `translateX(${offset}px)`,
    transition: `${animationDuration}ms`,
  };

  const handleLeftArrow = () => {
    setisAbleToGoRight(false);

    setOffset((currentOffset) => {
      const newOffsets = currentOffset + itemWidth * step;

      if (!infinite) {
        setisAbleToGoLeft(newOffsets >= 0);
      }

      return Math.min(newOffsets, 0);
    });
  };

  useMemo(() => {
    if (step >= 10) {
      setisAbleToGoRight(true);
    } else {
      setisAbleToGoRight(false);
    }
  }, [step]);

  const handleRightArrow = () => {
    setisAbleToGoLeft(false);
    setOffset((currentOffset) => {
      let newOffset = currentOffset - itemWidth * step;
      const maxOffset = -(itemWidth * (images.length - frameSize));

      if (infinite && newOffset === -(itemWidth * images.length)) {
        newOffset = 0;

        return newOffset;
      }

      if (!infinite) {
        setisAbleToGoRight(maxOffset >= newOffset);
      }

      return Math.max(newOffset, maxOffset);
    });
  };

  return (
    <div className="Carousel" id="Carousel">
      <button
        type="button"
        className="arrow"
        onClick={handleLeftArrow}
        disabled={isAbleToGoLeft}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="Next"
        className="arrow"
        onClick={handleRightArrow}
        disabled={isAbleToGoRight}
      >
        Next
      </button>
      <div id="viewport" style={div} className="viewport">
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
