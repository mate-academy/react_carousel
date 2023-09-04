import React, { useState, useEffect } from 'react';
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
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const visiblePhoto = images.slice(visibleIndex, visibleIndex + step);
  let sizeTranslate = 0;

  if (step === 2 || frameSize === 2) {
    sizeTranslate = itemWidth * frameSize;
  } else {
    sizeTranslate = itemWidth * frameSize;
  }

  const handleNext = () => {
    if (visibleIndex + step < images.length) {
      setVisibleIndex(visibleIndex + step);
      setTranslateX(translateX + sizeTranslate);
    }

    if (visibleIndex + step * 2 === images.length + 2) {
      setVisibleIndex((visibleIndex - 2) + (step));
      setTranslateX(translateX + 130);
    }
  };

  const handlePrev = () => {
    if (visibleIndex - step >= 0) {
      setVisibleIndex(visibleIndex - step);
      setTranslateX(translateX - sizeTranslate);
    }

    if (visibleIndex - step === -2) {
      setVisibleIndex((visibleIndex + 2) - (step));
      setTranslateX(translateX - 130);
    }
  };

  useEffect(() => {
    const wrapElement = document.querySelector('.Wrap') as HTMLElement;
    const imgElem = document.querySelector('.Carousel__img') as HTMLElement;

    imgElem.style.width = `${itemWidth}px`;
    imgElem.style.height = `${itemWidth}px`;

    if (step === 2 || frameSize === 2) {
      wrapElement.style.width = '260px';
    } else {
      wrapElement.style.width = '390px';
    }

    if (wrapElement) {
      wrapElement.style.transform = `translateX(${translateX}px)`;
      wrapElement.style.transition = `all ${animationDuration}ms ease-in-out`;
    }
  }, [translateX]);

  return (
    <div className="MainWrap">
      <>
        <button type="button" className={`Carousel__button button--left ${visibleIndex === 0 && 'disabled'}`} onClick={handlePrev}>Prev</button>
        <div className="Carousel">
          <div className="Wrap">
            <ul className="Carousel__list">
              {visiblePhoto.map((elem, index) => (
                <li key={elem}>
                  <img src={elem} alt={`${index + 1}`} className="Carousel__img" />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          className={`Carousel__button button--right ${visibleIndex === (images.length - step) && 'disabled'}`}
          onClick={handleNext}
        >
          Next
        </button>
      </>
    </div>
  );
};

export default Carousel;
