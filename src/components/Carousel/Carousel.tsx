import React, { useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';
import { Setting } from '../../type/type';

type Props = {
  image: string[],
  settings: Setting,
};

const Carousel: React.FC<Props> = ({ image, settings }) => {
  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = settings;

  const imgQuantity = image.length;
  const [translateX, setTranslateX] = useState(0);
  const [nextBtnDisable, setNextBtnDisable] = useState(false);
  const [prevBtnDisable, setPrevBtnDisable] = useState(true);
  const [index, setIndex] = useState(0);
  const [newImages, setNewImages] = useState([...image]);

  const scrollNext = () => {
    let newTranslateX = translateX - itemWidth * step;
    const stepQuantity = (imgQuantity - frameSize) * -itemWidth;

    setIndex(index + step);

    if (!infinite) {
      if (newTranslateX <= stepQuantity) {
        newTranslateX = stepQuantity;

        setNextBtnDisable(true);
        setPrevBtnDisable(false);
        setTranslateX(newTranslateX);

        return;
      }

      setPrevBtnDisable(false);
      setTranslateX(newTranslateX);
    } else {
      const difference = step - (newImages.length - index);

      const imageCopy1 = newImages.slice(difference);
      const imageCopy2 = newImages.slice(0, difference);

      setNewImages([...imageCopy1, ...imageCopy2]);
      setNextBtnDisable(false);
      setPrevBtnDisable(false);
      setTranslateX(0);
      setIndex(0);
    }
  };

  const scrollPrev = () => {
    let newTranslateX = translateX + itemWidth * step;

    if (!infinite) {
      if (newTranslateX >= 0) {
        newTranslateX = 0;

        setNextBtnDisable(false);
        setPrevBtnDisable(true);
        setTranslateX(0);
      }

      setNextBtnDisable(false);
      setTranslateX(newTranslateX);
    } else {
      const difference = newImages.length - step;

      const imageCopy1 = newImages.slice(difference);
      const imageCopy2 = newImages.slice(0, difference);

      setNewImages([...imageCopy1, ...imageCopy2]);
      setNextBtnDisable(false);
      setPrevBtnDisable(false);
      setTranslateX(0);
      setIndex(0);
    }
  };

  return (
    <div
      className="Carousel"
    >
      <div
        className="Carousel__wrap"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {newImages.map(img => (
            <li
              key={img}
              className="Carousel_item"
            >
              <img
                src={img}
                alt="smile"
                className="Carousel__img"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="buttons"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <button
          type="button"
          className={classNames(
            'buttons__btn',
            'buttons__btn--prev',
          )}
          disabled={prevBtnDisable}
          onClick={() => {
            scrollPrev();
          }}
        >
          <i className="arrow arrow--left" />
          Prev
        </button>

        <button
          type="button"
          className={classNames(
            'buttons__btn',
            'buttons__btn--next',
          )}
          disabled={nextBtnDisable}
          onClick={() => {
            scrollNext();
          }}
        >
          Next
          <i className="arrow arrow--right" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
