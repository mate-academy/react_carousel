import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  let lengthMove = 0;
  const moveSlider = (event: React.MouseEvent<HTMLElement>) => {
    const list = document.querySelector('.Carousel__list');
    const currentButton = event.target;
    const buttonNext = document
      .querySelector<HTMLButtonElement>('[data-cy=next]');
    const buttonPrev = document
      .querySelector<HTMLButtonElement>('[data-cy=prev]');
    const totalWidth = images.length * itemWidth;
    const totalFrameSize = frameSize * itemWidth;
    const totalStep = itemWidth * step;

    if (currentButton instanceof HTMLElement
      && list instanceof HTMLElement
      && buttonNext instanceof HTMLElement
      && buttonPrev instanceof HTMLElement) {
      switch (currentButton.dataset.cy) {
        case 'next':
          lengthMove -= totalStep;

          if (Math.abs(lengthMove) + totalStep >= totalWidth) {
            lengthMove = -1 * (totalWidth - totalFrameSize);
            list.style.transform = `translateX(${lengthMove}px)`;
            buttonNext.disabled = true;
          } else {
            buttonPrev.disabled = false;
            list.style.transform = `translateX(${lengthMove}px)`;
          }

          break;

        case 'prev':
          lengthMove += totalStep;

          if (lengthMove >= 0) {
            lengthMove = 0;
            list.style.transform = `translateX(${lengthMove}px)`;
            buttonPrev.disabled = true;
          } else {
            buttonNext.disabled = false;
            list.style.transform = `translateX(${lengthMove}px)`;
          }

          break;

        default:
          break;
      }
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${images.length * itemWidth}px`,
      }}
    >
      <div
        className="container"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `all ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`${index + 1}`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            data-cy="prev"
            onClick={moveSlider}
          >
            Prev
          </button>

          <button
            type="button"
            data-cy="next"
            onClick={moveSlider}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
