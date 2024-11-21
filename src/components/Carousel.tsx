import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [showFrom, setShowFrom] = useState(0);
  const [atTheBorder, setAtTheBorder] = useState(true);

  const styleScroll = () => {
    return {
      transform: `translateX(-${showFrom * itemWidth}px)`,
      transitionDuration: `${animationDuration}ms`,
      transitionProperty: 'transform',
    };
  };

  const styleImageWindow = () => {
    return {
      width: `${itemWidth * frameSize}px`,
    };
  };

  const handleScrollChange = (scrollAmount: number) => {
    setShowFrom(showFrom + scrollAmount);
  };

  return (
    <>
      <div className="Carousel" style={styleImageWindow()}>
        <ul className="Carousel__list" style={styleScroll()}>
          {images.map(image => (
            <li key={image}>
              <img src={image} alt={image.slice(-5, -4)} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => {
          if (infinite && atTheBorder && showFrom === 0) {
            setShowFrom(images.length - step);

            return;
          }

          if (showFrom - step >= 0) {
            handleScrollChange(-step);
            setAtTheBorder(false);
          } else {
            setShowFrom(0);
            setAtTheBorder(true);
          }
        }}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={() => {
          if (infinite && atTheBorder && showFrom > 0) {
            setShowFrom(0);

            return;
          }

          if (showFrom + step * 2 >= images.length) {
            setShowFrom(images.length - step);
            setAtTheBorder(true);
          } else {
            handleScrollChange(step);
            setAtTheBorder(false);
          }
        }}
      >
        Next
      </button>
    </>
  );
};

export default Carousel;
