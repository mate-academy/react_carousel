import React, { useState } from 'react';
import { State as Props } from '../../Types';
import './Carousel.scss';

const Carousel: React.FC<Props> = ({ images, settings }) => {
  const {
    frameSize, step, speed, width,
  } = settings;

  const [translateX, setTranslateX] = useState(0);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [prevBtnStatus, setPrevBtnStatus] = useState(true);

  function scrollPrev() {
    let newTranslate = translateX + width * step;

    if (newTranslate >= 0) {
      newTranslate = 0;

      setPrevBtnStatus(true);
      setNextBtnStatus(false);
      setTranslateX(newTranslate);

      return;
    }

    setNextBtnStatus(false);
    setTranslateX(newTranslate);
  }

  function scrollNext() {
    let newTranslate = translateX + -width * step;
    const maxStep = (10 - frameSize) * -width;

    if (newTranslate < maxStep) {
      newTranslate = maxStep;

      setPrevBtnStatus(false);
      setNextBtnStatus(true);
      setTranslateX(newTranslate);

      return;
    }

    if (newTranslate === maxStep) {
      setNextBtnStatus(true);
    }

    setPrevBtnStatus(false);
    setTranslateX(newTranslate);
  }

  return (
    <div className="Wrap">
      <div
        className={`Carousel Carousel_${frameSize}`}
        style={{ width: `${width * frameSize}px` }}
      >
        <ul
          style={{
            transform: `translate(${translateX}px)`,
            transition: `${speed}ms`,
          }}
          className="Carousel__list"
        >
          {images.map((src) => {
            return (
              <li
                key={src}
              >
                <img
                  src={src}
                  alt={src}
                  style={{ width: `${width}px` }}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="Carousel__btn">
        <button
          disabled={prevBtnStatus}
          type="button"
          onClick={() => {
            scrollPrev();
          }}
        >
          Prev
        </button>
        <button
          disabled={nextBtnStatus}
          type="button"
          onClick={() => {
            scrollNext();
          }}
        >
          Next

        </button>
      </div>
    </div>
  );
};

export default Carousel;
