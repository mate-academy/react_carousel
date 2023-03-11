import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const initialState = {
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
  frameSize: 3,
  step: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

class App extends React.Component<{}, State> {
  state = initialState;

  handleItemsWidth = (value: number) => {
    if (value >= 100) {
      this.setState({ itemWidth: value });
    }
  };

  handleFrameSize = (value: number) => {
    if (value >= 1) {
      this.setState({ frameSize: value });
    }
  };

  handleStepSize = (value: number) => {
    if (value >= 1) {
      this.setState({ step: value });
    }
  };

  handleAnimationDuration = (value: number) => {
    if (value >= 0) {
      this.setState({ animationDuration: value });
    }
  };

  toggleInfinite = (isChecked: boolean) => {
    this.setState({ infinite: isChecked });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title'>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="settings">
          <label htmlFor="itemId">
            <p>Items width: </p>

            <input
              className="settings__input"
              id="itemId"
              type="number"
              defaultValue={itemWidth}
              min="100"
              max="300"
              onChange={(event) => {
                this.handleItemsWidth(+event.target.value);
              }}
            />
          </label>

          <label htmlFor="frameId">
            <p>Amount of images in frame: </p>

            <input
              className="settings__input"
              id="frameId"
              type="number"
              min="1"
              max="5"
              defaultValue={frameSize}
              onChange={(event) => {
                this.handleFrameSize(+event.target.value);
              }}
            />
          </label>

          <label htmlFor="stepId">
            <p>Step size: </p>

            <input
              className="settings__input"
              id="stepId"
              type="number"
              min={1}
              max={5}
              defaultValue={step}
              onChange={(event) => {
                this.handleStepSize(+event.target.value);
              }}
            />
          </label>

          <label htmlFor="animationId">
            <p>Set animation duration in ms: </p>

            <input
              className="settings__input"
              id="animationId"
              type="number"
              step="100"
              min={0}
              defaultValue={animationDuration}
              onChange={(event) => {
                this.handleAnimationDuration(+event.target.value);
              }}
            />
          </label>

          <label htmlFor="infiniteId">
            <p>Infinite: </p>

            <input
              className="settings__checkbox"
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={(event) => this.toggleInfinite(event.target.checked)}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
