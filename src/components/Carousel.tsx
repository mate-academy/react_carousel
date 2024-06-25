import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}: CarouselProps) => {
  const [translate, setTranslate] = useState(0);

  const maxItemLength = itemWidth * images.length;

  const showPrev = () => {
    if (translate - itemWidth * step < 0 && translate === 0) {
      setTranslate(maxItemLength - itemWidth * frameSize);
    } else if (translate - itemWidth * step < 0) {
      setTranslate(0);
    } else {
      setTranslate(prevTranslate => prevTranslate - itemWidth * step);
    }
  };

  const showNext = () => {
    if (translate + itemWidth * frameSize >= maxItemLength) {
      setTranslate(0);
    } else if (
      translate + itemWidth * step >=
      maxItemLength - itemWidth * frameSize
    ) {
      setTranslate(maxItemLength - itemWidth * frameSize);
    } else {
      setTranslate(prevTranslate => prevTranslate + itemWidth * step);
    }
  };

  function showInfinite() {
    setTimeout(showNext, animationDuration);
  }

  if (infinite) {
    showInfinite();
  }

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${translate}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, i) => (
          <li key={i}>
            <img
              src={image}
              alt={`${i}`}
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button type="button" data-cy="prev" onClick={showPrev}>
          Prev
        </button>
        <button type="button" data-cy="next" onClick={showNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
