import { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  width: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

export const Carousel: React.FC<Props> = ({
  images, width, frameSize, step, animationDuration,
}) => {
  const [move, setMove] = useState(0);
  const itemWidth = { width: `${width}px` };
  const maxNextMove = (images.length - frameSize) * -width;
  const mover = {
    transform: `translate(${move}px)`,
    transition: `all ${animationDuration}ms`,
  };

  const containerStyles = {
    width: `${width * frameSize}px`,
    transition: `all ${animationDuration}ms`,
  };

  const handlePrev = () => {
    setMove((prevMove) => {
      const moveBack = prevMove + width * step;

      if (moveBack > 0) {
        return 0;
      }

      return moveBack;
    });
  };

  const handleNext = () => {
    setMove((prevMove) => {
      const moveNext = prevMove - width * step;

      if (moveNext < maxNextMove) {
        return maxNextMove;
      }

      return moveNext;
    });
  };

  return (
    <>
      <div className="Carousel" style={containerStyles}>
        <ul className="Carousel__list" style={mover}>
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`${index}`}
                style={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          className="button"
          type="button"
          onClick={handlePrev}
          disabled={move === 0}
        >
          {'<<<Prev'}
        </button>
        <button
          className="button"
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={move === maxNextMove}
        >
          {'Next>>>'}
        </button>
      </div>

    </>
  );
};
