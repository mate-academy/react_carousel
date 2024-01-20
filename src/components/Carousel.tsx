import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite = false,
}) => {
  const STAP_MOVE = step * itemWidth;
  const getMaxMove = () => images.length * itemWidth - STAP_MOVE;

  const ulStyle = { width: `${frameSize * itemWidth}px` };

  const [move, setMove] = useState(0);

  const liStyle = {
    transition: `${animationDuration}ms`,
    transform: `translateX(${move}px)`,
  };

  const handelPrev = () => {
    const maxMove = getMaxMove();

    if (infinite && move >= 0) {
      setMove(-maxMove);
    }

    if (move < 0) {
      const newMove = move + STAP_MOVE;

      if (newMove <= 0) {
        setMove(newMove);
      } else {
        setMove(0);
      }
    }
  };

  const handelNex = () => {
    const maxMove = getMaxMove();

    if (infinite && move <= -maxMove) {
      setMove(0);
    }

    if (move > -maxMove) {
      const newMove = move - STAP_MOVE;

      if (newMove >= -maxMove) {
        setMove(newMove);
      } else {
        setMove(-maxMove);
      }
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={ulStyle}
      >
        {images.map((img, i) => (
          <li
            key={parseInt(img.slice(6), 10)}
            style={liStyle}
            className="Carousel__item"
          >
            <img
              src={img}
              alt={`${i + 1}`}
              style={{ width: `${itemWidth}px` }}
            />
          </li>

        ))}
      </ul>

      <button
        type="button"
        onClick={handelPrev}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="next"
        onClick={handelNex}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
