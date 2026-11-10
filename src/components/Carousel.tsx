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

const Carousel: React.FC<CarouselProps> = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const frameWidth = props.frameSize * props.itemWidth;
  const translateX = -(currentIndex * props.itemWidth);
  const maxInd = props.images.length - props.frameSize;
  const nextInd = currentIndex + props.step;
  const prevInd = currentIndex - props.step;

  return (
    <div className="Carousel" style={{ width: `${frameWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          listStyle: `none`,
          padding: 0,
          transform: `translateX(${translateX}px)`,
          transitionDuration: `${props.animationDuration}ms`,
        }}
      >
        {props.images.map(image => (
          <li
            key={image}
            style={{
              width: props.itemWidth,
              height: props.itemWidth,
            }}
          >
            <img
              src={image}
              alt="carousel item"
              width={props.itemWidth}
              height={props.itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          if (prevInd >= 0) {
            setCurrentIndex(prevInd);
          }

          if (props.infinite === true && nextInd < 0) {
            setCurrentIndex(maxInd);
          }
        }}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="next"
        onClick={() => {
          if (nextInd <= maxInd) {
            setCurrentIndex(nextInd);
          }

          if (props.infinite === true && nextInd > maxInd) {
            setCurrentIndex(0);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
