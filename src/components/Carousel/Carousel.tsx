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

type TypedOptions = [
  string,
  number,
  React.Dispatch<React.SetStateAction<number>>,
][];

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPrevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [isNextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [imgWidth, setImgWidth] = useState(itemWidth);
  const [imgCount, setImgCount] = useState(frameSize);
  const [carouselStep, setCarouselStep] = useState(step);
  const [duration, setDuration] = useState(animationDuration);

  const options: TypedOptions = [
    ['itemWidth', imgWidth, setImgWidth],
    ['frameSize', imgCount, setImgCount],
    ['step', carouselStep, setCarouselStep],
    ['animationDuration', duration, setDuration],
  ];

  const carouselStyles = {
    carousel: { maxWidth: `${imgWidth * imgCount}px` },
    list: {
      transform: `translateX(${currentSlide}px)`,
      transition: `all ${duration / 1000}s`,
    },
    item: { minWidth: `${imgWidth}px` },
  };

  const slideCarousel = (btn: any) => {
    const beginOfList = imgWidth * carouselStep * -1;
    const endOfList = imgWidth * (images.length - imgCount - carouselStep) * -1;

    const slideBack = () => {
      if (currentSlide >= imgWidth * carouselStep * -1) {
        setCurrentSlide(0);
        setPrevBtnDisabled(true);
      }

      if (
        currentSlide >= imgWidth * images.length * -1
        && currentSlide <= beginOfList
      ) {
        setCurrentSlide(currentSlide + (+imgWidth * carouselStep));
        setNextBtnDisabled(false);
      }
    };

    const slideForward = () => {
      if (currentSlide > imgWidth * (images.length - imgCount) * -1) {
        setCurrentSlide(currentSlide - (imgWidth * carouselStep));
        setPrevBtnDisabled(false);
      }

      if (
        currentSlide >= (imgWidth * images.length * -1)
        && currentSlide <= endOfList
      ) {
        setCurrentSlide((imgWidth * (images.length - imgCount) * -1));
        setNextBtnDisabled(true);
      }
    };

    btn.classList.contains('Carousel__btn--prev')
      ? slideBack()
      : slideForward();
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
            { 'Carousel__btn--disabled': isPrevBtnDisabled },
          )}
          type="button"
          onClick={({ target }) => slideCarousel(target)}
        >
          Prev
        </button>
        <button
          className={cn(
            'Carousel__btn',
            'Carousel__btn--next',
            { 'Carousel__btn--disabled': isNextBtnDisabled },
          )}
          type="button"
          data-cy="next"
          onClick={({ target }) => slideCarousel(target)}
        >
          Next
        </button>
      </div>

      <Options options={options} imagesLength={images.length} />
    </>
  );
};
