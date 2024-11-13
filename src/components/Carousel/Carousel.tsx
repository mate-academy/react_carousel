import React, { useEffect, useState } from 'react';
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
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const totalWidth = images.length * itemWidth;
  const duration = animationDuration / 1000;
  const [translate, setTranslate] = useState(0);
  const [isDisabled, setIsDisabled] = useState({ prev: false, next: false });

  useEffect(() => {
    setIsDisabled({
      prev: translate >= 0,
      next: translate <= -totalWidth + frameSize * itemWidth,
    });
  }, [translate, totalWidth, frameSize, itemWidth]);

  const handlePrev = () => {
    return setTranslate(prevTranslate => {
      const newTranslate = prevTranslate + itemWidth * step;

      if (infinite) {
        return newTranslate > 0
          ? frameSize % 2
            ? -totalWidth + itemWidth
            : -totalWidth + itemWidth * frameSize
          : newTranslate;
      }

      return newTranslate > 0 ? 0 : newTranslate;
    });
  };

  const handleNext = () => {
    return setTranslate(prevTranslate => {
      const newTranslate = prevTranslate + -itemWidth * step;

      if (infinite) {
        return newTranslate > -totalWidth ? newTranslate : 0;
      }

      return newTranslate > -totalWidth ? newTranslate : -totalWidth;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__width"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translate}px)`,
            transition: `all ${duration}s`,
          }}
        >
          {images.map((image, i) => (
            <li key={image}>
              <img
                className="Carousel__img"
                src={image}
                alt={String(i + 1)}
                style={{ width: itemWidth + 'px' }}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          disabled={infinite ? false : isDisabled.prev}
          onClick={() => {
            handlePrev();
          }}
        >
          {'<'}
        </button>

        <button
          data-cy="next"
          type="button"
          className="Carousel__button"
          disabled={infinite ? false : isDisabled.next}
          onClick={() => {
            handleNext();
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
