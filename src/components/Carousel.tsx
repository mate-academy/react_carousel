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
  const [translate, setTranslate] = useState(0);
  const maxTranslate = images.length - frameSize;

  const handleShowPrev = () => {
    if (translate - step < 0) {
      if (infinite) {
        setTranslate(maxTranslate);

        return;
      }

      setTranslate(0);

      return;
    }

    setTranslate(prev => prev - step);
  };

  const handleShowNext = () => {
    if (translate + step > maxTranslate) {
      if (infinite) {
        setTranslate(0);

        return;
      }

      setTranslate(maxTranslate);

      return;
    }

    setTranslate(prev => prev + step);
  };

  return (
    <div className="Carousel">
      <button
        disabled={!infinite && translate === 0}
        onClick={handleShowPrev}
        type="button"
      >
        ⮜
      </button>
      <div className="Carousel__frame" style={{ width: itemWidth * frameSize }}>
        <ul
          className="Carousel__list"
          style={{
            width: itemWidth * images.length,
            transition: `transform ${animationDuration}ms`,
            transform: `translateX(-${itemWidth * translate}px)`,
          }}
        >
          {images.map((img, i) => (
            <li key={i}>
              <img src={img} alt={i.toString()} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        disabled={!infinite && translate === maxTranslate}
        onClick={handleShowNext}
        type="button"
        data-cy="next"
      >
        ⮞
      </button>
    </div>
  );
};

export default Carousel;
