import React, { useRef } from 'react';
import './Carousel.scss';
import { useState } from 'react';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = (props: Props) => {
  const [itemWidth, setItemWidth] = useState<number>(props.itemWidth);
  const [frameSize, setFrameSize] = useState<number>(props.frameSize);
  const [step, setStep] = useState<number>(props.step);
  const [tAnimation, setTAnimation] = useState<number>(props.animationDuration);

  const [counterSliding, setCounterSliding] = useState<number>(1);

  const containerSliderElement = useRef<HTMLDivElement>(null);

  const handleInputChangeItemWidth = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setItemWidth(Number(e.target.value));
  };

  const handleInputChangeFrameSize = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (Number(e.target.value) !== frameSize && Number(e.target.value) <= props.images.length) {
      setFrameSize(Number(e.target.value));
    }
  };

  const handleInputChangeStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (step > 1 && step <= props.images.length) {
      setStep(Number(e.target.value));
    }
  };

  const handleInputChangeTAnimation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (tAnimation && Number(e.target.value) < 5000) {
      setTAnimation(Number(e.target.value));
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__inputs">
        <ul className="Input__list">
          <li className="List__item">
            <span className="Item__label">Item width</span>
            <div className="Input__wrapper">
              <button
                className="Input__up"
                onClick={() => setItemWidth(itemWidth + 1)}
              >
                +
              </button>
              <input
                type="number"
                name="item-width"
                id="item-width"
                className="Input__input"
                style={{ width: '5dvw' }}
                value={itemWidth.toString()}
                onChange={handleInputChangeItemWidth}
              />
              <button
                onClick={() => setItemWidth(itemWidth - 1)}
                className="Input__down"
              >
                -
              </button>
            </div>
          </li>
          <li className="List__item">
            <span className="Item__label">Frame size</span>
            <div className="Input__wrapper">
              <button
                onClick={() => {
                  if (frameSize < props.images.length) {
                    setFrameSize(frameSize + 1);
                  }
                }}
                className="Input__up"
              >
                +
              </button>
              <input
                type="number"
                name="frame-size"
                id="frame-size"
                min={1}
                max={props.images.length}
                style={{ width: '5dvw' }}
                className="Input__input"
                value={frameSize.toString()}
                onChange={handleInputChangeFrameSize}
              />
              <button
                className="Input__down"
                onClick={() => {
                  if (Number(frameSize) > 0) {
                    setFrameSize(frameSize - 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </li>

          <li className="List__item">
            <span className="Item__label">Step</span>
            <div className="Input__wrapper">
              <button
                onClick={() => {
                  if (step < props.images.length) {
                    setStep(step + 1);
                  }
                }}
                className="Input__up"
              >
                +
              </button>
              <input
                type="number"
                name="step"
                id="step"
                min={1}
                max={props.images.length}
                className="Input__input"
                style={{ width: '5dvw' }}
                value={step.toString()}
                onChange={handleInputChangeStep}
              />
              <button
                className="Input__down"
                onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </li>
          <li className="List__item">
            <span className="Item__label">{`Animation time (ms)`}</span>
            <div className="Input__wrapper">
              <button
                onClick={() => {
                  setTAnimation(tAnimation + 1);
                }}
                className="Input__up"
              >
                +
              </button>
              <input
                type="number"
                name="t-animation"
                id="t-animation"
                min={100}
                max={5000}
                style={{ width: '5dvw' }}
                className="Input__input"
                value={tAnimation.toString()}
                onChange={handleInputChangeTAnimation}
              />
              <button
                className="Input__down"
                onClick={() => {
                  if (tAnimation > 1) {
                    setTAnimation(tAnimation - 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div
        className="Carousel__wrapper"
        style={{
          width: `${itemWidth * frameSize}px`,
          overflowX: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          ref={containerSliderElement}
          style={{
            width: `${itemWidth * frameSize}px`,
            transitionDuration: `${tAnimation}`,
          }}
        >
          {props.images.map((imageUrl, index) => {
            return (
              <React.Fragment key={index}>
                <li className="List__item">
                  <img
                    style={{
                      width: `${itemWidth}px`,
                    }}
                    className="Item__image"
                    src={imageUrl}
                    alt="Emoji do carrossel"
                  />
                </li>
              </React.Fragment>
            );
          })}
        </ul>
        <div className="Carousel__controllers">
          <button
            onClick={() => {

              if(props.infinite) {
                if (counterSliding > 1 && counterSliding.current) {
                  const currentTranslateX =
                    containerSliderElement.current.style.transform
                      .split('(')[1]
                      .split('px')[0];
  
                  containerSliderElement.current.style.transform = `translateX(${Number(currentTranslateX) + itemWidth * step}px)`;
  
                  setCounterSliding(counterSliding - 1);
  
                  return;
                }
  
                setCounterSliding(Math.floor(props.images.length / frameSize));
                containerSliderElement.current.style.transform = `translateX(-${itemWidth * step * Math.floor(props.images.length / frameSize)}px)`;
                return;
              }

              if (counterSliding > 1) {
                const currentTranslateX =
                  containerSliderElement.current.style.transform
                    .split('(')[1]
                    .split('px')[0];

                containerSliderElement.current.style.transform = `translateX(${Number(currentTranslateX) + itemWidth * step}px)`;

                setCounterSliding(counterSliding - 1);

                return;
              }

            }}
            className="Controllers__item Controllers__item--prev"
            type="button"
          >
            Prev
          </button>
          <button
            onClick={() => {
              if(props.infinite) {
                if (counterSliding < Math.ceil(props.images.length / frameSize)) {
                  setCounterSliding(counterSliding + 1);
                  containerSliderElement.current.style.transform = `translateX(-${itemWidth * step * counterSliding}px)`;
  
                  return;
                }
  
                setCounterSliding(1);
                containerSliderElement.current.style.transform = '';
                return;
              }

              if (counterSliding < Math.ceil(props.images.length / frameSize)) {
                setCounterSliding(counterSliding + 1);
                containerSliderElement.current.style.transform = `translateX(-${itemWidth * step * counterSliding}px)`;

                return;
              }

            }}
            className="Controllers__item Controllers__item--next"
            data-cy="next"
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
