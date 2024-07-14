import React, { useState, useRef, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize,
  step,
  animationDuration,
  infinite = false,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.transition = `transform ${animationDuration}ms ease-in-out`;
    }
  }, [animationDuration]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.transform = `translateX(-${currentImage * itemWidth}px)`;
    }
  }, [currentImage, itemWidth, frameSize]);

  const handlePrevClick = () => {
    setCurrentImage(prevIndex => {
      let newIndex = prevIndex - step;

      if (newIndex < 0) {
        newIndex = infinite ? images.length - frameSize : 0;
      }

      return newIndex;
    });
  };

  const handleNextClick = () => {
    setCurrentImage(prevIndex => {
      let newIndex = prevIndex + step;

      if (newIndex >= images.length) {
        newIndex = infinite ? 0 : images.length - frameSize;
      }

      return newIndex;
    });
  };

  return (
    <div
      className="Carousel"
      style={{ width: itemWidth * frameSize, overflow: 'hidden' }}
    >
      <ul
        className="Carousel__list"
        ref={listRef}
        style={{ width: images.length * itemWidth }}
      >
        {images.map((image, index) => (
          <li
            key={index}
            className="Carousel__item"
            style={{ width: itemWidth }}
          >
            <img
              src={image}
              width={itemWidth}
              height={itemWidth}
              className="Carousel__img"
              alt={`Image ${index + 1}`}
            />
          </li>
        ))}
      </ul>
      <button type="button" className="Carousel__btn" onClick={handlePrevClick}>
        Prev
      </button>
      <button
        type="button"
        className="Carousel__btn"
        data-cy="next"
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
