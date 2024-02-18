import React, { useState } from "react";
import "./Carousel.scss";
import { State } from "../types/State";

const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startImg, setStartImg] = useState(0);
  const endOfImg = frameSize + startImg;
  const carouselSize = itemWidth * frameSize + frameSize * 10;
  const translateX = startImg === 0 ? 0 : startImg * (itemWidth + 10);

  const handleNextChange = () => {
    if (infinite && endOfImg === images.length) {
      setStartImg(0);
    } else {
      setStartImg(
        endOfImg + step < images.length
          ? startImg + step
          : images.length - frameSize,
      );
    }
  };

  const handlenPrevChange = () => {
    if (infinite && startImg === 0) {
      setStartImg(images.length - frameSize);
    } else {
      setStartImg(startImg > step ? startImg - step : 0);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: carouselSize,
        }}
      >
        {images.map((image, imageIndex) => {
          return (
            <li className="Carousel__list__item" key={image}>
              <img
                style={{
                  transform: `translateX(${-translateX}px)`,
                  transition: `transform ${animationDuration}ms`,
                }}
                className="Carousel__list__item__img"
                src={image}
                alt={`face ${imageIndex}`}
                width={itemWidth}
              />
            </li>
          );
        })}
      </ul>

      <div className="Carousel__buttonContainer">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlenPrevChange}
          disabled={!infinite && startImg === 0}
        >
          {"<<<"}
        </button>
        <button
          className="Carousel__buttonContainer__button"
          type="button"
          data-cy="next"
          onClick={handleNextChange}
          disabled={!infinite && images.length - frameSize === startImg}
        >
          {">>>"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
