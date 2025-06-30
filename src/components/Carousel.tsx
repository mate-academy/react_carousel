import React, { useEffect, useRef, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
};

enum Direction {
  next = 'next',
  prev = 'prev',
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
    document.title = 'Carousel';
    if (listRef.current) {
      listRef.current.style.transform = `translateX(0px)`;
    }
  }, [frameSize, images.length]);

  function scrollToImage(direction: Direction) {
    const listNode = listRef.current;
    let newOffset =
      direction === Direction.next ? offset + step : offset - step;

    const maxOffset = Math.max(0, images.length - frameSize);

    if (newOffset > maxOffset) {
      newOffset = maxOffset;
    }

    if (newOffset < 0) {
      newOffset = 0;
    }

    if (listNode) {
      listNode.style.transform = `translateX(-${newOffset * itemWidth}px)`;
      setOffset(newOffset);
    }
  }

  const maxOffset = Math.max(0, images.length - frameSize);
  const canGoNext = offset < maxOffset;
  const canGoPrev = offset > 0;

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{ width: frameSize * itemWidth }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: images.length * itemWidth,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
          ref={listRef}
        >
          {images.map((image, index) => {
            return (
              <li key={image}>
                <img src={image} alt={`${index + 1}`} width={itemWidth} />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => scrollToImage(Direction.prev)}
        disabled={!canGoPrev}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={() => scrollToImage(Direction.next)}
        disabled={!canGoNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
