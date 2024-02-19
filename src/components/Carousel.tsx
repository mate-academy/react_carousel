import React, { useState } from "react";
import "./Carousel.scss";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    if (infinite) {
      if (currentIndex !== 0) {
        setCurrentIndex(currentIndex - step);
      } else {
        setCurrentIndex(images.length - 1);
      }
    } else {
      setCurrentIndex(currentIndex === 1 ? 0 : currentIndex - step);
    }

    // console.log(currentIndex);
  };

  const next = () => {
    if (infinite) {
      if (currentIndex + step < images.length) {
        setCurrentIndex(currentIndex + step);
      } else {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(
        currentIndex + step >= images.length
          ? images.length - frameSize
          : currentIndex + step,
      );
    }

    // console.log(currentIndex);
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={image} className="Carousel__item">
            <img
              width={itemWidth}
              height={itemWidth}
              src={image}
              alt={`${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={!infinite && currentIndex < 1}
        onClick={prev}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        disabled={!infinite && currentIndex + step >= images.length}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
