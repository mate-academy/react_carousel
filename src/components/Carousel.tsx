import React from 'react';
import './Carousel.scss';
import cn from 'classnames';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  setStep: (value: number) => void;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  itemWidth,
  frameSize,
  setStep,
  animationDuration,
}) => {

  const gap = 5;
  const carouselWidth = frameSize * itemWidth;
  const left = -(step) * (itemWidth + gap * 2) ;
  const stepSize = 2;

  return (
    <div className="Carousel">
      <button
        type="button"
        className={cn('Carousel__btn Carousel__btn--prev', { disabled: step <= 0 })}
        onClick={() => {
          const nextStep = step - stepSize;
          const minStep = 0;
          setStep(nextStep >= minStep ? nextStep : minStep);
        }}
      >
      </button>
      <div className='Carousel-container' style={{ width: carouselWidth + frameSize * (gap * 2) }}>
        <ul
          className='Carousel__list'
          style={{ left: left, transition: `left ${animationDuration / 1000}s ease 0s` }}
        >
          {
            images.map((image, index) => (
              <li key={index}>
                <img src={image} alt={image[index]} style={{ width: itemWidth, marginRight: gap, marginLeft: gap }} />
              </li>
            ))
          }
        </ul>
      </div>

      <button
        type="button"
        className={cn('Carousel__btn Carousel__btn--next', { disabled: step >= images.length - frameSize })}
        data-cy='next'
        onClick={() => {
          const nextStep = step + stepSize;
          const maxStep = images.length - frameSize;
          setStep(nextStep > maxStep ? maxStep : nextStep);
        }}
      >
      </button>
    </div>
  )
};

export default Carousel;
