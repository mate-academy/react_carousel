import React, { useMemo, useState } from 'react';
import './Carousel.scss';
import { CarouselProps } from '../types/CarouselProps';

const IMAGES_GAP = 20;

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [translate, setTranslate] = useState(0);

  const maxWidth = useMemo(() => {
    return images.length * itemWidth + (images.length - 1) * IMAGES_GAP;
  }, [images, itemWidth]);
  const maxTranslate = useMemo(() => {
    return maxWidth - frameSize * itemWidth - (frameSize - 1) * IMAGES_GAP;
  }, [maxWidth, frameSize, itemWidth]);

  const handleNextClick = () => {
    if (translate === maxTranslate && infinite) {
      setTranslate(0);

      return;
    }

    let newTranslate = translate + step * itemWidth + step * IMAGES_GAP;

    if (newTranslate >= maxTranslate) {
      newTranslate = maxTranslate;
    }

    setTranslate(newTranslate);
  };

  const handlePrevClick = () => {
    if (translate === 0 && infinite) {
      setTranslate(maxTranslate);

      return;
    }

    let newTranslate = translate - step * itemWidth - step * IMAGES_GAP;

    if (newTranslate < 0) {
      newTranslate = 0;
    }

    setTranslate(newTranslate);
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${frameSize * itemWidth + (frameSize - 1) * IMAGES_GAP}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: IMAGES_GAP,
            transform: `translateX(-${translate}px)`,
            transition: `transform ${animationDuration / 1000}s ease`,
          }}
        >
          {images.map((image: string, index: number) => (
            <li key={index}>
              <img src={image} alt={`${index}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__buttons__left"
          onClick={handlePrevClick}
        ></button>
        <button
          type="button"
          className="Carousel__buttons__right"
          data-cy="next"
          onClick={handleNextClick}
        ></button>
      </div>
    </div>
  );
};

export default Carousel;
