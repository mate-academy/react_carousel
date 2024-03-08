import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  img: string[];
  itemWidth: number;
  duration: number;
  step: number;
  frameSize: number;
};

const Carousel: React.FC<Props> = ({
  img,
  itemWidth,
  duration,
  step,
  frameSize,
}) => {
  const [currentPx, setCurrentPx] = useState(0);

  const numberShowImg = (frameSize + 3) * itemWidth;
  const stepScrolImg = step * itemWidth;
  const maxWidth = -(itemWidth * (img.length - 3 - frameSize));

  const goToNext = () => {
    setCurrentPx(
      currentPx - stepScrolImg <= maxWidth
        ? maxWidth
        : currentPx - stepScrolImg,
    );
  };

  const goToPrev = () => {
    setCurrentPx(currentPx + stepScrolImg >= 0 ? 0 : currentPx + stepScrolImg);
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__main-container"
        style={{ width: `${numberShowImg}px` }}
      >
        <div className="Carousel__container">
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${currentPx}px)`,
              transition: `transform ${duration}ms ease-in-out`,
              animation: 'infinite',
            }}
          >
            {img.map((url, index) => (
              <li key={url}>
                <img src={url} alt={`${index + 1}`} width={itemWidth} />
              </li>
            ))}
          </ul>
        </div>
        <div className="Carousel__button-position">
          <button className="Carousel__button" type="button" onClick={goToPrev}>
            <img
              className="Carousel__arr-left"
              src="./img/arr-left.png"
              alt="left"
            />
          </button>
          <button
            className="Carousel__button"
            data-cy="next"
            type="button"
            onClick={goToNext}
          >
            <img
              className="Carousel__arr-right"
              src="./img/arr-right.png"
              alt="right"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
