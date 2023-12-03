import cn from 'classnames';

import React, { useEffect, useState } from 'react';
import { Menu } from '../Menu/Menu';

import './Carousel.scss';

type Props = {
  images: string[];
};

const generateNumberArray = (start: number, count: number) => {
  return Array.from({ length: count }, (_, index) => start + index);
};

export const Carousel: React.FC<Props> = ({ images }) => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [translateX, setTranslateX] = useState(0);
  const totalWidth = images.length * itemWidth;
  const [lastElements, setLastElements] = useState(0);
  const [activeImg, setActiveImg] = useState<number[]>([]);
  const arrowPrev = '<';
  const arrowNext = '>';

  useEffect(() => {
    const startActiveImg = (Math.abs(translateX) / itemWidth) + 1;
    const newArray = generateNumberArray(startActiveImg, frameSize);

    setActiveImg(newArray);
  }, [translateX, itemWidth, frameSize]);

  useEffect(() => {
    setLastElements(totalWidth - itemWidth * frameSize);
  }, [totalWidth, itemWidth, frameSize]);

  useEffect(() => {
    const carouselContainer = document.querySelector(
      '.Carousel__container',
    ) as HTMLElement | null;

    if (carouselContainer) {
      carouselContainer.style.width = `${itemWidth * frameSize}px`;
    }
  }, [itemWidth, frameSize]);

  useEffect(() => {
    const items = document.querySelectorAll('.Carousel__item');

    if (items) {
      items.forEach(item => {
        const element = item as HTMLElement;

        element.style.transform = `translateX(${translateX}px)`;
        element.style.transition = `transform ${animationDuration}ms`;
        element.style.width = `${itemWidth}px`;
      });
    }

    const imgItems = document.querySelectorAll('img');

    if (imgItems) {
      imgItems.forEach(item => {
        const element = item as HTMLElement;

        element.style.width = `${itemWidth}px`;
      });
    }
  }, [animationDuration, translateX, itemWidth]);

  const slideNext = () => {
    setTranslateX((prevTranslateX) => {
      const newTranslateX = prevTranslateX - itemWidth * step;

      return Math.max(-lastElements, newTranslateX);
    });
  };

  const slideBack = () => {
    setTranslateX((prevTranslateX) => {
      const newTranslateX = prevTranslateX + itemWidth * step;

      return Math.min(0, newTranslateX);
    });
  };

  const isPrevDisabled = translateX === 0;
  const isNextDisabled = translateX === -lastElements;

  const prevButtonClass = cn('button', {
    disabled: isPrevDisabled,
  });

  const nextButtonClass = cn('button', {
    disabled: isNextDisabled,
  });

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <ul className="Carousel__list">
          {images.map((img, i) => {
            const imgAlt = (i + 1);

            return (
              <li
                key={imgAlt}
                className={cn(
                  'Carousel__item',
                  {
                    'Carousel__item--active': activeImg.some(
                      a => a === imgAlt,
                    ),
                  },
                )}
              >
                <img
                  src={img}
                  alt={`img ${imgAlt}`}
                />
              </li>
            );
          })}
        </ul>
        <div className="Carousel__button-container">
          <button
            type="button"
            className={prevButtonClass}
            onClick={slideBack}
          >
            {arrowPrev}
          </button>
          <button
            type="button"
            data-cy="next"
            className={nextButtonClass}
            onClick={slideNext}
          >
            {arrowNext}
          </button>
        </div>
      </div>

      <Menu
        itemWidth={itemWidth}
        setItemWidth={setItemWidth}
        frameSize={frameSize}
        setFrameSize={setFrameSize}
        step={step}
        setStep={setStep}
        animationDuration={animationDuration}
        setAnimationDuration={setAnimationDuration}
      />
    </div>
  );
};

export { };
