import React, { useState } from 'react';
import './Carousel.scss';
import CarouselButtons from './CarouselButtons';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState<number>(0);
  const frameLastSmile = images.length - frameSize;
  const onClickNext = () => {
    setPosition(prev => {
      if (prev === frameLastSmile && infinite) {
        return 0;
      }

      if (prev + step >= frameLastSmile) {
        return frameLastSmile;
      }

      return prev + step;
    });
  };

  const onClickPrev = () => {
    setPosition(prev => {
      if (prev === 0 && infinite) {
        return frameLastSmile;
      }

      if (prev - step <= 0) {
        return 0;
      }

      return prev - step;
    });
  };

  const carouselStyles = {
    width: `${itemWidth * frameSize - 1}px`,
  };

  const carouseListStyles = {
    transform: `translateX(-${position * itemWidth}px)`,
    transition: `${animationDuration}ms ease`,
    height: `${itemWidth}px`,
  };

  return (
    <div className="Carousel" style={carouselStyles}>
      <ul className="Carousel__list" style={carouseListStyles}>
        {images.map(image => {
          return (
            <li key={image}>
              <img width={itemWidth} src={image} alt={image} />
            </li>
          );
        })}
      </ul>

      <CarouselButtons onClickNext={onClickNext} onClickPrev={onClickPrev} />
    </div>
  );
};

export default Carousel;
