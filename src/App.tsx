import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number | string,
  frameSize: number | string,
  step: number | string,
  animationDuration: number | string,
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
  };

  handleChangeItemWidth = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;

    if (name === 'itemWidth') {
      if (+value <= 300 && +value >= 0) {
        this.setState(previousState => ({
          ...previousState,
          [name]: value,
        }));
      }
    }
  };

  handleChangeFrameAndSteps = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;

    if (name === 'frameSize' || name === 'step') {
      if (+value <= 10 && +value >= 0) {
        this.setState(previousState => ({
          ...previousState,
          [name]: value,
        }));
      }
    }
  };

  handleChangeAnimation = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;

    if (name === 'animationDuration') {
      if (+value <= 4000 && +value >= 0) {
        this.setState(previousState => ({
          ...previousState,
          [name]: value,
        }));
      }
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="App__inputs">
          <label>
            Item Width:
            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              min="50"
              max="300"
              step="10"
              className="App__item"
              onChange={this.handleChangeItemWidth}
            />
          </label>

          <label>
            Frame Size:
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              min="1"
              max={images.length}
              className="App__item"
              onChange={this.handleChangeFrameAndSteps}
            />
          </label>

          <label>
            Step:
            <input
              type="number"
              name="step"
              value={step}
              min="1"
              max={images.length}
              className="App__item"
              onChange={this.handleChangeFrameAndSteps}
            />
          </label>

          <label>
            Animation Duration:
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              min="100"
              max="4000"
              step="100"
              className="App__item"
              onChange={this.handleChangeAnimation}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animation={animationDuration}
        />
      </div>
    );
  }
}

export default App;
