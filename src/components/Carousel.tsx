import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  itemWidth: number;
  images: string[];
  frameSize: number;
  animationDuration: number;
  step: number;
}

const Carousel: React.FC<Props> = ({
  itemWidth,
  images,
  frameSize,
  animationDuration,
  step,
}) => {
  const visibleImages = itemWidth * frameSize;
  const stepImages = itemWidth * step;
  const imagesWidth = itemWidth * 10;
  const imagenWidthVisble = imagesWidth - visibleImages;
  const [transform, setTransform] = useState(0);

  const carouselMovementForward = () => {
    const goodStep = imagenWidthVisble - transform;
    const stepElse = goodStep + transform;
    const stepImg = stepImages + transform;

    if (imagenWidthVisble >= stepImg) {
      setTransform(stepImg);
    } else {
      setTransform(stepElse);
    }
  };

  const carouselMovementBack = () => {
    const steps = transform - stepImages;
    const zero = 0;

    if (zero <= steps) {
      setTransform(steps);
    } else {
      setTransform(zero);
    }
  };

  return (
    <div className="container">
      <div
        className="Carousel"
        style={{
          width: `${visibleImages}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${transform}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((element, i) => (
            <li key={element} style={{ height: itemWidth }}>
              <img src={`${element}`} alt={`${i + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <div className="container-button">
        <button
          type="button"
          disabled={transform === 0}
          onClick={() => carouselMovementBack()}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          disabled={(transform + visibleImages) === imagesWidth}
          onClick={() => carouselMovementForward()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
