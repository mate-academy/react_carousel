import React, { useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC<{
  images: string[];
  animationDuration: number;
  step: number;
  frameSize: number;
  itemWidth: number;
}> = ({ images, animationDuration, itemWidth, step, frameSize }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translate = currentIndex * itemWidth * -1;
  const lengthOfList = images.length * itemWidth;
  const lengthOfWrap = frameSize * itemWidth;
  const lastIndex = images.length - (images.length % frameSize);

  const showNext = () => {
    if (currentIndex + frameSize < lastIndex) {
      setCurrentIndex(prev => prev + step);
    } else if (currentIndex + frameSize === lastIndex) {
      setCurrentIndex(prev => prev + (images.length % frameSize));
    }
  };

  const showPrevious = () => {
    if (currentIndex - frameSize >= 0) {
      setCurrentIndex(prev => prev - step);
    } else if (currentIndex > 0 && currentIndex < step) {
      setCurrentIndex(prev => prev - (images.length % frameSize));
    }
  };

  return (
    <div className="Carousel" style={{ width: `${lengthOfList}px` }}>
      <button
        type="button"
        onClick={() => showPrevious()}
        disabled={currentIndex === 0}
      >
        Prev
      </button>
      <div className="Carousel__wrap" style={{ width: `${lengthOfWrap}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translate}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map(item => (
            <li
              className="list__item"
              key={images.indexOf(item)}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            >
              <img
                src={item}
                alt={item}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        type="button"
        onClick={() => showNext()}
        disabled={currentIndex + frameSize === images.length}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
