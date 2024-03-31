import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [scrollCount, setScrollCount] = useState(0);

  const changeScrollCount = (scroll: number) => {
    if (scroll < 0 || (scroll === images.length && infinite)) {
      setScrollCount(0);

      return;
    }

    if (scroll > images.length - frameSize) {
      setScrollCount(images.length - frameSize);

      return;
    }

    setScrollCount(scroll);
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${scrollCount * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(image => {
            const imageName = image.replace('./img/', '').replace('.png', '');

            return (
              <li key={imageName}>
                <img src={image} alt={imageName} width={itemWidth} />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => changeScrollCount(scrollCount - step)}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={() => changeScrollCount(scrollCount + step)}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
