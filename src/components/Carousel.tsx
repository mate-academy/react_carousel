import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startImage, setStartImage] = useState<number>(1);
  const imagesLength = images.length;

  function handleNextImageMove() {
    if (!infinite && startImage + step >= imagesLength - frameSize + 1) {
      setStartImage(imagesLength - frameSize + 1);
    } else if (infinite && startImage + step > imagesLength) {
      setStartImage(1);
    } else {
      let newStartImage = startImage + step;

      if (newStartImage > imagesLength) {
        newStartImage -= imagesLength;
      }

      setStartImage(newStartImage);
    }
  }

  function handlePrevImageMove() {
    if (!infinite && startImage - step <= 0) {
      setStartImage(1);
    } else {
      let newStartImage = startImage - (step % 10);

      if (newStartImage < 1) {
        newStartImage += imagesLength;
      }

      setStartImage(newStartImage);
    }
  }

  const transformValue =
    imagesLength - startImage < frameSize
      ? `translateX(-${itemWidth * (imagesLength - frameSize)}px)`
      : `translateX(-${itemWidth * (startImage - 1)}px)`;

  return (
    <div
      className="Carousel"
      style={{ width: `${itemWidth * frameSize}px`, overflow: 'hidden' }}
    >
      <ul
        className="Carousel__list"
        style={{
          height: `${itemWidth}px`,
          width: `${itemWidth * frameSize}px`,
          transform: `${transformValue}`,
          transition: 'transform',
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {images.map((imageLink, imageIndex) => (
          <li key={imageLink}>
            <img
              src={imageLink}
              width={itemWidth}
              alt={String(imageIndex + 1)}
              style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => handlePrevImageMove()}>
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={() => handleNextImageMove()}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
