/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';
import { Options } from '../Options/Options';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number,
  step: number,
  animationDuration: number,
}

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgWidth, setImgWidth] = useState(itemWidth);
  const [imgCount, setImgCount] = useState(frameSize);
  const [carouselStep, setCarouselStep] = useState(step);
  const [duration, setDuration] = useState(animationDuration);

  const beginOfList = imgWidth * carouselStep * -1;
  const endOfList = imgWidth * (images.length - imgCount - carouselStep) * -1;
  const totalWidth = imgWidth * images.length * -1;
  const isNextBtnDisabled = currentSlide === imgWidth
    * (images.length - imgCount) * -1;

  const options = [
    {
      name: 'imgWidth',
      placeholder: 'Img width',
      min: 100,
      max: 200,
      value: imgWidth,
      set: setImgWidth,
    },
    {
      name: 'imgCount',
      placeholder: 'Img count',
      min: 1,
      max: images.length - 1,
      value: imgCount,
      set: setImgCount,
    },
    {
      name: 'carouselStep',
      placeholder: 'Step',
      min: 1,
      max: images.length - imgCount,
      value: carouselStep,
      set: setCarouselStep,
    },
    {
      name: 'duration',
      placeholder: 'Animation duration',
      min: 300,
      max: 1200,
      value: duration,
      set: setDuration,
    },
  ];

  const carouselStyles = {
    carousel: { maxWidth: `${imgWidth * imgCount}px` },
    list: {
      transform: `translateX(${currentSlide}px)`,
      transition: `all ${duration / 1000}s`,
    },
    item: { minWidth: `${imgWidth}px` },
  };

  const slideBack = () => {
    if (currentSlide >= imgWidth * carouselStep * -1) {
      setCurrentSlide(0);
    }

    if (currentSlide >= totalWidth && currentSlide <= beginOfList) {
      setCurrentSlide(currentSlide + (imgWidth * carouselStep));
    }
  };

  const slideForward = () => {
    if (currentSlide > imgWidth * (images.length - imgCount) * -1) {
      setCurrentSlide(currentSlide - (imgWidth * carouselStep));
    }

    if (currentSlide >= totalWidth && currentSlide <= endOfList) {
      setCurrentSlide(imgWidth * (images.length - imgCount) * -1);
    }
  };

  return (
    <>
      <div className="Carousel" style={carouselStyles.carousel}>
        <ul className="Carousel__list" style={carouselStyles.list}>
          {
            images.map((img, index) => (
              <li
                className="Carousel__item"
                style={carouselStyles.item}
                key={img}
              >
                <img className="Carousel__img" src={img} alt={`${index + 1}`} />
              </li>
            ))
          }
        </ul>

        <button
          className={cn(
            'Carousel__btn',
            'Carousel__btn--prev',
            { 'Carousel__btn--disabled': currentSlide === 0 },
          )}
          type="button"
          onClick={slideBack}
        >
          Prev
        </button>
        <button
          className={cn(
            'Carousel__btn',
            'Carousel__btn--next',
            {
              'Carousel__btn--disabled': isNextBtnDisabled,
            },
          )}
          type="button"
          data-cy="next"
          onClick={slideForward}
        >
          Next
        </button>
      </div>

      <Options
        options={options}
        setCurrentSlide={setCurrentSlide}
      />
    </>
  );
};
