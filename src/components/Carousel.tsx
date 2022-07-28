import React from 'react';

import './Carousel.scss';

type Props = {
  images: string[],
  step: string | undefined,
  width: string | undefined,
  animationDuration: string | undefined,
  frameSize: string | undefined,
};

const translate = (value: string) => {
  if (!value) {
    return '0';
  }

  const arr = value.split('');
  const valueImg = arr.splice(10).join('');

  return valueImg.slice(1, valueImg.length - 3);
};

const newSlide = (step: number, width: number, amount: number) => {
  const images = document.getElementById('Carousel__list');

  if (images) {
    const currentValue = translate(images.style.transform);

    if (Math.abs(width * amount) > Math.abs(+currentValue - (width * 2))) {
      images.style.transform = `translateX(${+currentValue - (step * width)}px)`;
    }
  }
};

const oldSlide = (step: number, width: number) => {
  const images = document.getElementById('Carousel__list');

  if (images) {
    const currentValue = translate(images.style.transform);

    if (Math.abs(+currentValue) !== 0) {
      images.style.transform = `translateX(${+currentValue + (step * width)}px)`;
    }
  }
};

export const Carousel: React.FC<Props> = (
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
      className="btn"
      onClick={() => {
        oldSlide(+step, +width);
      }}
    >
      Prev
    </button>
    <button
      type="button"
      className="btn btn--red"
      onClick={() => {
        newSlide(+step, +width, images.length);
      }}
      data-cy="next"
    >
      Next
    </button>
  </>
);
