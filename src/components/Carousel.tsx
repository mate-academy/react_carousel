import React, { useRef } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const carouselContainer = useRef<HTMLUListElement>(null);
  const currentOffset = useRef(0);

  const scroll = (direction: 'left' | 'right') => {
    const currentList = carouselContainer.current;

    if (!currentList) {
      return;
    }

    const maxOffset = 0;
    const minOffset = -((images.length - frameSize) * itemWidth);

    let newOffset =
      currentOffset.current +
      step * itemWidth * (direction === 'right' ? -1 : 1);

    if (newOffset > maxOffset) {
      newOffset = maxOffset;
    } else if (newOffset < minOffset) {
      newOffset = minOffset;
    }

    currentOffset.current = newOffset;

    currentList.style.transition = `transform ${animationDuration}ms ease`;
    currentList.style.transform = `translateX(${currentOffset.current}px)`;
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__list-wrapper"
        style={{
          width: frameSize * itemWidth,
          height: itemWidth,
        }}
      >
        <ul ref={carouselContainer} className="Carousel__list">
          {images.map(image => (
            <li key={image} className="Carousel__item">
              <img
                className="Carousel__image"
                src={image}
                alt={image.split('/').pop()?.replace('.png', '')}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="switches">
        <button type="button" onClick={() => scroll('left')}>
          Prev
        </button>
        <button data-cy="next" type="button" onClick={() => scroll('right')}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
