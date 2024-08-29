import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [firstVisibleItem, setFirstVisibleItem] = useState(0);

  const listGap = 30;
  const widthFrame = frameSize * itemWidth + (frameSize - 1) * listGap;

  const handleClickNext = () => {
    const newFirstVisibleItem = firstVisibleItem + step;

    if (images.length - newFirstVisibleItem >= frameSize) {
      setFirstVisibleItem(newFirstVisibleItem);
    } else if (
      infinite === true &&
      firstVisibleItem === images.length - frameSize
    ) {
      setFirstVisibleItem(0);
    } else {
      setFirstVisibleItem(images.length - frameSize);
    }
  };

  const handleClickPrev = () => {
    const newFirstVisibleItem = firstVisibleItem - step;

    if (newFirstVisibleItem >= 0) {
      setFirstVisibleItem(newFirstVisibleItem);
    } else if (infinite === true && firstVisibleItem === 0) {
      setFirstVisibleItem(images.length - frameSize);
    } else {
      setFirstVisibleItem(0);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${widthFrame}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${-(firstVisibleItem * itemWidth + firstVisibleItem * listGap)}px)`,
          transition: `transform ${animationDuration}ms`,
          gap: `${listGap}px`,
        }}
      >
        {images.map(image => (
          <li key={image} className="Carousel__item">
            <img
              src={image}
              alt="image"
              className="Carousel__img"
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className={cn('Carousel__button', {
            'Carousel__button--disabled':
              infinite === false && firstVisibleItem === 0,
          })}
          onClick={handleClickPrev}
        >
          {`<`}
        </button>
        <button
          type="button"
          data-cy="next"
          className={cn('Carousel__button', {
            'Carousel__button--disabled':
              infinite === false &&
              firstVisibleItem === images.length - frameSize,
          })}
          onClick={handleClickNext}
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
