import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const gap = 20;
  const totalGapValue = gap * (frameSize - 1);
  const visibleImagesWidth = itemWidth * frameSize + totalGapValue;

  const [translateValue, setTranslateValue] = useState(0);

  const newTranslateValue = step * (itemWidth + gap);

  const allImagesWidth = (10 * itemWidth) + (9 * gap);
  const extremeTranslatePoint = allImagesWidth - visibleImagesWidth;

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const currentButton = event.currentTarget;
  //   const currentButtonClasslist = currentButton.classList;
  //   let value = 0;

  //   if (currentButtonClasslist.contains('button-prev')) {
  //     value = Math.min(translateValue + newTranslateValue, 0);
  //   } else if (currentButtonClasslist.contains('button-next')) {
  //     value = Math.max(
  //       translateValue - newTranslateValue, (-extremeTranslatePoint),
  //     );
  //   }

  //   if (infinite && -1 * value >= extremeTranslatePoint) {
  //     value = 0;
  //   }

  //   setTranslateValue(value);
  // };

  const handlePrev = () => {
    let value = 0;

    value = Math.min(translateValue + newTranslateValue, 0);
    // if (infinite && -1 * value >= extremeTranslatePoint) {
    //   value = 0;
    // }

    setTranslateValue(value);
  };

  const handleRight = () => {
    let value = 0;

    value = Math.max(
      translateValue - newTranslateValue, (-extremeTranslatePoint),
    );
    if (infinite && -1 * value >= extremeTranslatePoint) {
      value = 0;
    }

    setTranslateValue(value);
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          className={cn('button-prev', {
            'button-prev__disabled': translateValue === 0,
          })}
          type="button"
          onClick={handlePrev}
        >
          <div className="button-prev__text">&lt;</div>
        </button>
        <ul className="Carousel__list" style={{ width: `${visibleImagesWidth}px` }}>
          <div
            className="Carousel__item-wrapper"
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: `transform ${animationDuration}ms ease`,
              gap: `${gap}px`,
            }}
          >
            {images.map(image => (
              <li
                className="Carousel__item"
                key={image}
                style={{
                  transform: `translateX(${translateValue}px)`,
                  transition: `transform ${animationDuration}ms ease`,
                }}
                // style={{ height: `${itemWidth}px` }}
              >
                <img
                  src={image}
                  alt={`${images.indexOf(image) + 1}`}
                  width={itemWidth}
                  // style={{
                  //   width: `${itemWidth}px`,
                  //   height: `${itemWidth}px`,
                  // }}
                />
              </li>
            ))}
          </div>
        </ul>
        <button
          className={cn('button-next', {
            'button-next__disabled': translateValue === -extremeTranslatePoint,
          })}
          type="button"
          data-cy="next"
          onClick={handleRight}
        >
          <div className="button-next__text">&gt;</div>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
