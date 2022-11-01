import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  imageUrls: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = (
  {
    imageUrls,
    itemWidth,
    frameSize,
    step,
    animationDuration,
  },
) => {
  const [imagePosition, setImagePosition] = useState(0);

  const nextBtnLimit
    = ((itemWidth * imageUrls.length) - (frameSize * itemWidth)) * -1;

  const prevBtnLimit = 0;

  const nextImg = () => {
    setImagePosition(current => current - (step * itemWidth));
  };

  const prevImg = () => {
    setImagePosition(current => current + (step * itemWidth));
  };

  const itemSize = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };

  const carouselStyles = {
    maxWidth: `${itemWidth * frameSize}px`,
  };

  const imgListStyles = {
    transform: `translateX(${imagePosition}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={carouselStyles}>
        <ul
          className="Carousel__list"
          style={imgListStyles}
        >
          {imageUrls.map((imageUrl: string, index: number) => (
            <li key={imageUrl}>
              <img src={imageUrl} alt={`${index + 1}`} style={itemSize} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={prevImg}
          disabled={Math.abs(imagePosition) <= prevBtnLimit}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={nextImg}
          disabled={imagePosition <= nextBtnLimit}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Carousel;
