import React, { useState, useEffect, useRef } from 'react';
import './Carousel.scss';
import { Value } from '../types.tsx/Values';
import { Input } from './Input';

type Props = {
  images: string[],
  step: string,
  frameSize: string,
  itemWidth:string,
  animationDuration: string,
  infinite: boolean,
  chengeState: (value: Value) => void;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  chengeState,
}) => {
  const [steps, setSteps] = useState(step);
  const [frame, setFrame] = useState(frameSize);
  const [itemWdt, setItemWdt] = useState(itemWidth);
  const [duration, setDuration] = useState(animationDuration);
  const [translate, setTranslate] = useState(0);
  const [cyclic, setCyclic] = useState(infinite);

  const interval = useRef<NodeJS.Timeout | null>(null);

  const clickHandler = () => {
    const value = {
      step: steps,
      frameSize: frame,
      itemWidth: itemWdt,
      animationDuration: duration,
      infinite: cyclic,
    };

    chengeState(value);
  };

  const moveRight = () => {
    if (Math.abs(translate) < (images.length - +step) * +itemWdt) {
      setTranslate(() => translate - +step * +itemWdt);
    } else if (cyclic) {
      setTranslate(0);
    }
  };

  const buttonHandler = (direction: string) => {
    switch (direction) {
      case 'Prev':
        if (translate < 0) {
          setTranslate(() => translate + +step * +itemWdt);
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
    if (cyclic) {
      interval.current = setInterval(() => {
        moveRight();
      }, +animationDuration);
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [cyclic, translate]);

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
            onChange={clickHandler}
          >
            <Input
              labelFor="item-width"
              type="number"
              name="Item width"
              key="Item width"
              max="260"
              value={itemWdt}
              method={setItemWdt}
            />

            <Input
              labelFor="frame-size"
              type="number"
              name="Frame size"
              key="Frame size"
              max="13"
              value={frame}
              method={setFrame}
            />

            <Input
              labelFor="step"
              type="number"
              name="Step"
              key="Step"
              max="6"
              value={steps}
              method={setSteps}
            />

            <Input
              labelFor="animation-duration"
              type="number"
              name="Duration"
              key="Duration"
              max="10000"
              value={duration}
              method={setDuration}
            />

            <label htmlFor="cyclic">Infinite</label>
            <input
              id="cyclic"
              name="cyclic"
              type="checkbox"
              key="cyclic"
              onChange={() => setCyclic(!cyclic)}
            />
          </form>
        </div>
        <button
          type="button"
          data-cy="next"
          className={Math.abs(translate) >= (images.length - +step) * +itemWdt
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
