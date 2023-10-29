import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  infinite: boolean;
  animationSpeed: number;
}
const MAX_IMAGE_SIZE = 200;
const MIN_IMAGE_SIZE = 100;
const MAX_STEP = 9;
const MIN_STEP = 1;
const MAX_ANIMATION_SPEED = 5000;
const MIN_ANIMATION_SPEED = 100;
const MAX_FRAME_SIZE = 10;
const MIN_FRAME_SIZE = 1;

class App extends React.Component<{}, State> {
  state = {
    images: [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ],
    animationSpeed: 1000,
    infinite: false,
    frameSize: 3,
    itemWidth: 130,
    step: 3,
  };

  updateAnimationSpeed = (newValue: number) => {
    this.setState({ animationSpeed: newValue });
  };

  updateInfinite = (newValue: boolean) => {
    this.setState({ infinite: newValue });
  };

  updateFrameSize = (newValue: number) => {
    this.setState({ frameSize: newValue });
  };

  updateItemWidth = (newValue: number) => {
    this.setState({ itemWidth: newValue });
  };

  updateStep = (newValue: number) => {
    this.setState({ step: newValue });
  };

  render() {
    const {
      images,
      animationSpeed,
      infinite,
      frameSize,
      itemWidth,
      step,
    } = this.state;

    const onValueInput = (e: React.KeyboardEvent<HTMLInputElement>,
      maxValue: number,
      minValue: number) => {
      const target = e.currentTarget;
      const value = parseInt(target.value, 10);

      if (e.key === 'ArrowUp' && value !== maxValue) {
        if (target === document.getElementById('animation__input')) {
          target.value = (+target.value + 99).toString();
        }

        return;
      }

      if (e.key === 'ArrowDown' && value !== minValue) {
        if (target === document.getElementById('animation__input')) {
          target.value = (+target.value - 99).toString();
        }

        return;
      }

      e.preventDefault();
    };

    return (
      <div className="App animated">
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>
        <div className="controls">
          <div className="controls__container controls__width">
            <label
              className="controls__label"
              htmlFor="itemId"
            >
              Item width:
            </label>
            <input
              id="itemId"
              className="controls__input"
              name="itemId"
              type="number"
              value={itemWidth}
              onKeyDown={(e) => onValueInput(e, MAX_IMAGE_SIZE, MIN_IMAGE_SIZE)}
              onChange={(e) => {
                this.updateItemWidth(parseInt(e.currentTarget.value, 10));
              }}
            />
          </div>
          <div className="controls__container controls__frame">
            <label
              className="controls__label"
              htmlFor="frameSize"
            >
              Frame size:
            </label>
            <input
              className="controls__input"
              name="frameSize"
              type="number"
              value={frameSize}
              onKeyDown={(e) => onValueInput(e, MAX_FRAME_SIZE, MIN_FRAME_SIZE)}
              onChange={(e) => {
                this.updateFrameSize(parseInt(e.currentTarget.value, 10));
              }}
            />
          </div>
          <div className="controls__container controls__step">
            <label
              className="controls__label"
              htmlFor="step"
            >
              Step:
            </label>
            <input
              className="controls__input"
              name="step"
              type="number"
              value={step}
              onKeyDown={(e) => onValueInput(e, MAX_STEP, MIN_STEP)}
              onChange={(e) => {
                this.updateStep(parseInt(e.currentTarget.value, 10));
              }}
            />
          </div>
          <div className="controls__container controls__animation">
            <label
              className="controls__label"
              htmlFor="animation"
            >
              Animation speed:
            </label>
            <input
              className="controls__input"
              id="animation__input"
              name="animation"
              type="number"
              value={animationSpeed}
              onKeyDown={(e) => {
                onValueInput(e, MAX_ANIMATION_SPEED, MIN_ANIMATION_SPEED);
              }}
              onChange={(e) => {
                this.updateAnimationSpeed(parseInt(e.currentTarget.value, 10));
              }}
            />
          </div>
          <div className="controls__container controls__infinite">
            <label
              className="controls__label"
              htmlFor="infinite"
            >
              Infinite:
            </label>
            <label className="switch">
              <input
                className="controls__input controls__input--checkbox"
                name="infinite"
                type="checkbox"
                onChange={() => {
                  this.updateInfinite(!infinite);
                }}
              />
              <span className="slider round" />
            </label>
          </div>
        </div>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationSpeed}
          infinite={infinite}
        />
        <div className="App__info">
          <p className="App_info-paragraph">
            *use &quot;ArrowUp&quot; and &quot;ArrowDown&quot;
            when field is focused to change values
          </p>
        </div>
      </div>
    );
  }
}

export default App;
