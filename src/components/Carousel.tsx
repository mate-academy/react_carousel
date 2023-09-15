import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  aimationDuration: number,
  infinite: boolean,
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  aimationDuration,
  infinite,
}) => {
  const maximumScroll = itemWidth * images.length - frameSize * itemWidth;
  let curentTranslate = 0;
  let loopTrigger = false;

  const isValindScroll = (direction: string) => {
    const calculatedTranslatePrev = curentTranslate + step * itemWidth;
    const calculatedTranslateNext = curentTranslate - step * itemWidth;
    const ul = document.querySelector<HTMLElement>('.Carousel__list');

    if (curentTranslate === 0 || curentTranslate === -maximumScroll) {
      loopTrigger = true;
    }

    switch (direction) {
      case 'prev':
        if (calculatedTranslatePrev > 0 && loopTrigger && infinite) {
          curentTranslate = -maximumScroll;
          loopTrigger = false;
        } else if (calculatedTranslatePrev > 0) {
          curentTranslate = 0;
        } else {
          curentTranslate += step * itemWidth;
          loopTrigger = false;
        }

        break;
      case 'next':
        if (calculatedTranslateNext < -maximumScroll
            && loopTrigger
            && infinite
        ) {
          curentTranslate = 0;
          loopTrigger = false;
        } else if (calculatedTranslateNext < -maximumScroll) {
          curentTranslate = -maximumScroll;
        } else {
          curentTranslate -= step * itemWidth;
          loopTrigger = false;
        }

        break;
      default: curentTranslate = 0;
    }

    if (ul) {
      ul.style.transform = `translateX(${curentTranslate}px)`;
    }
  };

  const onButtonClick = (button: HTMLInputElement) => {
    const btnPrev = button.classList.contains('Carousel__button-Prev');
    const btnNext = button.classList.contains('Carousel__button-Next');

    const btnPrevQuery = document
      .querySelector('.Carousel__button-Prev');
    const btnNextQuery = document
      .querySelector('.Carousel__button-Next');

    switch (true) {
      case btnPrev:
        isValindScroll('prev');
        break;
      case btnNext:
        isValindScroll('next');
        break;
      default: curentTranslate = 0;
    }

    if (curentTranslate === 0 && !infinite) {
      (btnPrevQuery as HTMLInputElement).disabled = true;
    } else {
      (btnPrevQuery as HTMLInputElement).disabled = false;
    }

    if (curentTranslate === -maximumScroll && !infinite) {
      (btnNextQuery as HTMLInputElement).disabled = true;
    } else {
      (btnNextQuery as HTMLInputElement).disabled = false;
    }
  };

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <div className="Carousel__container">
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * 10}px`,
            transition: `all ${aimationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li
              className="Carousel__list-item"
              key={image}
            >
              <img
                className="Carousel__list-image"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
                src={image}
                alt={`${images.indexOf(image)}`}
              />
            </li>
          ))}
        </ul>
        <button
          className="Carousel__button Carousel__button-Prev"
          type="button"
          onClick={e => {
            onButtonClick((
              e.target as HTMLInputElement
            ));
          }}
        >
          {'<'}
        </button>
        <button
          data-cy="next"
          className="Carousel__button Carousel__button-Next"
          type="button"
          onClick={e => {
            onButtonClick((
              e.target as HTMLInputElement
            ));
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
