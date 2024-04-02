import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   if (currentIndex + frameSize > images.length) {
  //     setCurrentIndex(images.length - frameSize);
  //   }
  // }, [frameSize]);

  const changeScrollCount = (scroll: number) => {
    if ((scroll < 0 && !infinite) || (scroll === images.length && infinite)) {
      setCurrentIndex(0);

      return;
    }

    if (scroll > images.length - frameSize || (scroll < 0 && infinite)) {
      setCurrentIndex(images.length - frameSize);

      return;
    }

    setCurrentIndex(scroll);
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
            transition: `transform ${animationDuration}ms ease`,
            transform: `translateX(-${currentIndex * itemWidth}px)`,
          }}
        >
          {images.map(image => {
            const imageName = image.replace('./img/', '').replace('.pnd', '');

            return (
              <li key={imageName}>
                <img src={image} alt={imageName} width={itemWidth} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="Carousel__button">
        <button
          type="button"
          className={`Carousel__button-left ${currentIndex === 0 && !infinite ? 'disabled' : ''}`}
          onClick={() => changeScrollCount(currentIndex - step)}
        >
          Prev
        </button>

        <button
          type="button"
          className={`Carousel__button-right ${currentIndex >= images.length - frameSize && !infinite ? 'disabled' : ''}`}
          onClick={() => changeScrollCount(currentIndex + step)}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
