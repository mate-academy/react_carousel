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

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [translate, setTranslate] = useState(0);
  const hiddenImages = (images.length - frameSize) * itemWidth;

  const onClickNext = () => {
    setTranslate(Math.max(translate - itemWidth * step, -hiddenImages));

    if (translate === -hiddenImages && infinite) {
      setTranslate(0);
    }
  };

  const onClickPrev = () => {
    setTranslate((prevTranslate) => (
      Math.min(prevTranslate + itemWidth * step, 0)));

    if (translate === 0 && infinite) {
      setTranslate(-hiddenImages);
    }
  };

  return (
    <div className="Carousel">
      <div style={{ width: frameSize * itemWidth }}>
        <ul
          className="Carousel__list"
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={image}
              style={{
                transform: `translateX(${translate}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img src={image} alt={`${index}`} style={{ width: itemWidth }} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button type="button" onClick={onClickPrev}>Prev</button>
        <button type="button" onClick={onClickNext}>Next</button>
      </div>
    </div>
  );
};
