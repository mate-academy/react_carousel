import React from 'react';
import Carosel from './components/Carousel';

import './App.scss';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  isInfinite: boolean;
}

enum PropsToChange {
  ItemWidth = 'itemWidt',
  FrameSize = 'frameSize',
  Step = 'step',
  AnimationDuration = 'animationDuration',
}

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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    isInfinite: false,
  };

  changeItemWidth = (value: number) => {
    this.setState({ itemWidth: value });
  };

  changeFrameSize = (value: number) => {
    this.setState({ frameSize: value });
  };

  changeStep = (value: number) => {
    this.setState({ step: value });
  };

  changeAnimationDuration = (value: number) => {
    this.setState({ animationDuration: value });
  };

  changeIsInfinite = (value: boolean) => {
    this.setState({ isInfinite: value });
  };

  handleItemWidthChange = (propToChange: string, value: number) => {
    switch (propToChange) {
      case 'itemWidt':
        this.changeItemWidth(value);
        break;

      case 'frameSize':
        this.changeFrameSize(value);
        break;

      case 'step':
        this.changeStep(value);
        break;

      case 'animationDuration':
        this.changeAnimationDuration(value);
        break;

      default:
        break;
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      isInfinite,
    } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carosel
          images={images}
          itemWidt={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          isInfinite={isInfinite}
        />

        <div className="app__control control">
          <ul className="control__list">
            <li className="control__item">
              <span className="control__name">Item width:</span>
              <input
                className="control__input"
                type="number"
                value={itemWidth}
                min="100"
                max="200"
                step="10"
                onChange={({ target }) => {
                  this.handleItemWidthChange(
                    PropsToChange.ItemWidth, Number(target.value),
                  );
                }}
              />
            </li>

            <li className="control__item">
              <span className="control__name">Frame size:</span>
              <input
                className="control__input"
                type="number"
                value={frameSize}
                min="1"
                max="10"
                step="1"
                onChange={({ target }) => {
                  this.handleItemWidthChange(
                    PropsToChange.FrameSize, Number(target.value),
                  );
                }}
              />
            </li>

            <li className="control__item">
              <span className="control__name">Step:</span>
              <input
                className="control__input"
                type="number"
                value={step}
                min="1"
                max={frameSize}
                step="1"
                onChange={({ target }) => {
                  this.handleItemWidthChange(
                    PropsToChange.Step, Number(target.value),
                  );
                }}
              />
            </li>

            <li className="control__item">
              <span className="control__name">Animation duration:</span>
              <input
                className="control__input"
                type="number"
                value={animationDuration}
                min="100"
                max="5000"
                step="100"
                onChange={({ target }) => {
                  this.handleItemWidthChange(
                    PropsToChange.AnimationDuration, Number(target.value),
                  );
                }}
              />
            </li>

            <li className="control__item">
              <span className="control__name">Infinite:</span>
              <input
                className="control__input"
                type="checkbox"
                checked={isInfinite}
                onChange={({ target }) => {
                  this.changeIsInfinite((target.checked));
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
