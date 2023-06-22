import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentImg, setCurrentImg] = useState(0);

  const stepUp = currentImg + step;
  const stepDown = currentImg - step;
  const lastEmojiIndex = images.length - frameSize;

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (event.currentTarget.name === 'prev') {
      if (!infinite) {
        setCurrentImg(
          stepDown > 0
            ? stepDown
            : 0,
        );
      } else {
        setCurrentImg(
          stepDown > 0
            ? stepDown
            : lastEmojiIndex,
        );
      }
    }

    if (event.currentTarget.name === 'next') {
      if (!infinite) {
        setCurrentImg(
          stepUp > lastEmojiIndex
            ? lastEmojiIndex
            : stepUp,
        );
      } else {
        setCurrentImg(
          stepUp > lastEmojiIndex
            ? 0
            : stepUp,
        );
      }
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
      }}
    >
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li
            key={image}
            className="Carousel__item"
            style={{
              transform: `translateX(${-itemWidth * currentImg}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={`img${index + 1}`}
              width={`${itemWidth}px`}
            />
          </li>
        ))}
      </ul>

      <button
        className="button"
        name="prev"
        type="button"
        disabled={!infinite && currentImg === 0}
        onClick={(event) => {
          handleButtonClick(event);
        }}
      >
        Prev
      </button>

      <button
        className="button"
        name="next"
        type="button"
        data-cy="next"
        disabled={
          !infinite
          && (images.length - frameSize) === currentImg
        }
        onClick={(event) => {
          handleButtonClick(event);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
