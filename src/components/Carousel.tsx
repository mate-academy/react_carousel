import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [translateX, setTranslateX] = useState<number>(0);
  const maxTranslate = (images.length - frameSize) * itemWidth;

  const styledCarousel: React.CSSProperties = {
    width: frameSize * itemWidth,
  };

  const styledCarouselList: React.CSSProperties = {
    transition: `all ${animationDuration}ms`,
    transform: `translateX(${translateX}px)`,
  };

  function stepLeft() {
    if (translateX >= 0) {
      return null;
    }

    if (Math.abs(translateX) - step * itemWidth < 0) {
      return setTranslateX(0);
    }

    setTranslateX(cur => cur + step * itemWidth);
  }

  function stepRight() {
    if (Math.abs(translateX) >= maxTranslate) {
      return null;
    }

    if (maxTranslate - Math.abs(translateX) < step * itemWidth) {
      return setTranslateX(-maxTranslate);
    }

    setTranslateX(cur => cur - step * itemWidth);
  }

  return (
    <div className="wrapper">
      <button
        type="button"
        data-cy="prev"
        className="button"
        aria-disabled={translateX >= 0 && true}
        onClick={() => stepLeft()}
      >
        Prev
      </button>
      <div className="Carousel" style={styledCarousel}>
        <ul className="Carousel__list" style={styledCarouselList}>
          {images.map((img, i) => (
            <li key={i}>
              <img
                className="image"
                style={{ width: itemWidth, height: itemWidth }}
                src={img}
                alt="1"
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        data-cy="next"
        className="button"
        aria-disabled={-translateX >= maxTranslate && true}
        onClick={() => stepRight()}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
