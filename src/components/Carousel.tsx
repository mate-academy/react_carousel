import React, { useEffect, useRef, useState } from 'react';
import { Value } from '../types/Values';
import { Input } from './Input';
import './Carousel.scss';

type Props = {
  images: string[],
  step: string,
  frameSize: string,
  itemWidth:string,
  animationDuration: string,
  infinite: boolean,
  changeState: (value: Value) => void,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  changeState,
}) => {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [translate, setTranslate] = useState(0);

  const moveRight = () => {
    if (Math.abs(translate) < (images.length - +step) * +itemWidth) {
      setTranslate(() => translate - +step * +itemWidth);
    } else if (infinite) {
      setTranslate(0);
    }
  };

  const buttonHandler = (direction: string) => {
    switch (direction) {
      case 'Prev':
        if (translate < 0) {
          setTranslate(() => translate + +step * +itemWidth);
        }

        break;
      case 'Next':
        moveRight();

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (infinite) {
      interval.current = setInterval(() => {
        moveRight();
      }, +animationDuration);
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [translate]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{ width: `${+frameSize * +itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translate}px)`,
            transition: `transform ${(animationDuration)}ms`,
          }}
        >
          {
            images.map((img, index) => {
              return (
                <li>
                  <img
                    src={img}
                    alt={`${index}`}
                    key={img}
                    className="Carousel__image"
                    style={{
                      width: `${itemWidth}px`,
                      height: `${itemWidth}px`,
                    }}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
      <div className="Carousel__controls">
        <button
          type="button"
          className={translate === 0 ? 'Carousel__end' : 'Carousel__btn'}
          onClick={() => buttonHandler('Prev')}
        >
          Prev
        </button>
        <div className="Carousel__inputs">
          <form
            action=""
            className="Carousel__form"
          >
            <Input
              labelFor="item-width"
              type="number"
              name="Item width"
              key="Item width"
              max="260"
              value={itemWidth}
              method={changeState}
            />

            <Input
              labelFor="frame-size"
              type="number"
              name="Frame size"
              key="Frame size"
              max="13"
              value={frameSize}
              method={changeState}
            />

            <Input
              labelFor="step"
              type="number"
              name="Step"
              key="Step"
              max="6"
              value={step}
              method={changeState}
            />

            <Input
              labelFor="animation-duration"
              type="number"
              name="Duration"
              key="Duration"
              max="10000"
              value={animationDuration}
              method={changeState}
            />

            <label htmlFor="cyclic">Infinite</label>
            <input
              id="cyclic"
              name="cyclic"
              type="checkbox"
              key="cyclic"
              onChange={() => changeState({
                type: 'infinite',
                bool: !infinite,
              })}
            />
          </form>
        </div>
        <button
          type="button"
          data-cy="next"
          className={Math.abs(translate) >= (images.length - +step) * +itemWidth
            ? 'Carousel__end' : 'Carousel__btn'}
          onClick={() => buttonHandler('Next')}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
