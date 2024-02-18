import React, { useEffect, useState } from "react";
import cn from "classnames";
import "./Carousel.scss";
import { State } from "../types";

const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const itemsAmount = images.length;
  const startItemCoordX = 0;
  const lastItemCoordX: number = -((images.length - frameSize) * itemWidth);
  const [coordX, setCoordX] = useState(startItemCoordX);
  const [firstItemIndex, setFirstItemIndex] = useState(0);

  useEffect(() => {
    setCoordX(startItemCoordX - firstItemIndex * itemWidth);
  }, [itemWidth]);

  useEffect(() => {
    setCoordX(startItemCoordX);
    setFirstItemIndex(0);
  }, [frameSize]);

  const handlePrevFrame = () => {
    const nextCoordX = itemWidth * step + coordX;

    if (nextCoordX < startItemCoordX) {
      setCoordX(nextCoordX);
      setFirstItemIndex(firstItemIndex - frameSize);
    } else if (coordX === startItemCoordX && infinite) {
      setCoordX(lastItemCoordX);
      setFirstItemIndex(itemsAmount - frameSize);
    } else {
      setCoordX(startItemCoordX);
      setFirstItemIndex(0);
    }
  };

  const handleNextFrame = () => {
    const nextXCoords = coordX - itemWidth * step;

    if (nextXCoords > lastItemCoordX) {
      setCoordX(nextXCoords);
      setFirstItemIndex(firstItemIndex + frameSize);
    } else if (coordX === lastItemCoordX && infinite) {
      setCoordX(startItemCoordX);
      setFirstItemIndex(0);
    } else {
      setCoordX(lastItemCoordX);
      setFirstItemIndex(itemsAmount - frameSize);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: frameSize * itemWidth,
        }}
      >
        {images.map((image) => {
          return (
            <li
              key={image}
              style={{
                transform: `translateX(${coordX}px)`,
                transitionDuration: `${animationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={`${images.indexOf(image) + 1}`}
                style={{
                  width: itemWidth,
                  height: itemWidth,
                }}
              />
            </li>
          );
        })}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrevFrame}
          className={cn("Carousel__btn", {
            "Carousel__btn--disabled": coordX === startItemCoordX && !infinite,
          })}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleNextFrame}
          className={cn("Carousel__btn", {
            "Carousel__btn--disabled": coordX === lastItemCoordX && !infinite,
          })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
