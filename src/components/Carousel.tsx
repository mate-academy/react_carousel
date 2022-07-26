import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: string | undefined,
  width: string | undefined,
  animationDuration: string | undefined,
  frameSize: string | undefined,
};

const getValueFromTranslate = (offset: string) => {
  if (!offset) {
    return '0';
  }

  const arr = offset.split('');
  const value = arr.splice(10).join('');

  return value.slice(1, value.length - 3);
};

const next = (step: number, width: number, length: number) => {
  const images = document.getElementById('Carousel__list');

  if (images) {
    const currentOffset = getValueFromTranslate(images.style.transform);

    if (Math.abs(+currentOffset - (width * 2)) < Math.abs(width * length)) {
      images.style.transform = `translateX(${+currentOffset - (step * width)}px)`;
    }
  }
};

const prev = (step: number, width: number) => {
  const images = document.getElementById('Carousel__list');

  if (images) {
    const currentOffset = getValueFromTranslate(images.style.transform);

    if (Math.abs(+currentOffset) !== 0) {
      images.style.transform = `translateX(${+currentOffset + (step * width)}px)`;
    }
  }
};

const Carousel: React.FC<Props> = (
  {
    images,
    step = '3',
    width = '130',
    animationDuration = '1000',
    frameSize = '3',
  },
) => (
  <>
    <div className="Carousel" style={{ width: `${+frameSize * +width}px` }}>
      <ul
        className="Carousel__list"
        id="Carousel__list"
        style={{ transform: 'translateX(0px)', transitionDuration: `${animationDuration}ms` }}
      >
        {images.map(img => (
          <li key={img}>
            <img
              src={img}
              alt={img}
              style={{ width: `${+width}px` }}
            />
          </li>
        ))}
      </ul>
    </div>
    <button
      type="button"
      onClick={() => {
        prev(+step, +width);
      }}
    >
      Prev
    </button>
    <button
      type="button"
      onClick={() => {
        next(+step, +width, images.length);
      }}
      data-cy="next"
    >
      Next
    </button>
  </>
);

export default Carousel;
