import React, { useState } from 'react';
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

  // const interval = useRef(null);

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

  const buttonHandler = (direction: string) => {
    switch (direction) {
      case 'Prev':
        if (translate < 0) {
          setTranslate(() => translate + +step * +itemWdt);
          clickHandler();
        }

        break;
      case 'Next':
        if (Math.abs(translate) < (images.length - +step) * +itemWdt) {
          setTranslate(() => translate - +step * +itemWdt);
          clickHandler();
        }

        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   if (cyclic) {
  //     interval.current = setInterval(() => {
  //       setTranslate(() => translate - +itemWdt);
  //     }, +animationDuration);
  //   } else {
  //     clearInterval(interval.current);
  //     interval.current = null;
  //   }
  //   return () => clearInterval(interval.current);
  // }, [cyclic]);

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
        <button type="button" onClick={() => buttonHandler('Prev')}>
          Prev
        </button>
        <div className="Carousel__inputs">
          <Input
            labelFor="item-width"
            type="number"
            name="Item width"
            value={itemWdt}
            method={setItemWdt}
          />

          <Input
            labelFor="frame-size"
            type="number"
            name="Frame size"
            value={frame}
            method={setFrame}
          />

          <Input
            labelFor="step"
            type="number"
            name="Step"
            value={steps}
            method={setSteps}
          />

          <Input
            labelFor="animation-duration"
            type="number"
            name="Duration"
            value={duration}
            method={setDuration}
          />

          <Input
            labelFor="cyclic"
            type="checkbox"
            name="cyclic"
            value={duration}
            method={() => setCyclic(!cyclic)}
          />
        </div>
        <button type="button" onClick={() => buttonHandler('Next')}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
