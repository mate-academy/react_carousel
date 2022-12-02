import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images?: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
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
    infinite: false,
  };

  updateInputValue(value: string, className: string) {
    const newState = { [className]: +value } as Pick<State, keyof State>;

    this.setState(newState);
  }

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy={'title'}>Carousel with {images.length} images</h1>
        <div className="input">
          <label className="input-block" htmlFor="itemId">
            Item width
            <input
              value={this.state.itemWidth || 130}
              onChange={(event) => {
                return this.updateInputValue(event.target.value, 'itemWidth');
              }}
              type="number"
              min="100"
              max="500"
              step="10"
              className="itemId"
              placeholder="Item width"
            />
          </label>
          <label className="input-block" htmlFor="frameId">
            Frame size
            <input
              value={this.state.frameSize || 3}
              onChange={(event) => {
                return this.updateInputValue(event.target.value, 'frameSize');
              }}
              type="number"
              min="1"
              max={images.length}
              className="frameId"
              placeholder="Frame size"
            />
          </label>

          <label className="input-block" htmlFor="stepId">
            Step
            <input
              value={this.state.step || 3}
              onChange={(event) => {
                return this.updateInputValue(event.target.value, 'step');
              }}
              type="number"
              min="1"
              max={images.length}
              className="stepId"
              placeholder="Step"
            />
          </label>

          <label className="input-block" htmlFor="animationDuration">
            Animation duration
            <input
              value={this.state.animationDuration || 1000}
              onChange={(event) => {
                return (
                  this.updateInputValue(event.target.value, 'animationDuration')
                );
              }}
              type="number"
              min="200"
              max="5000"
              step="100"
              className="animationDuration"
              placeholder="Animation duration"
            />
          </label>

        </div>

        <Carousel
          images={images}
          frameSize={frameSize}
          step={step}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
