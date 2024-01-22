import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title' className="App__title">Carousel with {images.length} images</h1>
        <div className="App__controls">

          <div className="App__controls__control">
            <label
              className="App__controls__control__label"
              htmlFor="stepId"
            >
              STEP:
            </label>
            <input
              className="App__controls__control__input"
              id="stepId"
              type="number"
              min={1}
              value={step}
              onChange={(e) => this.setState({
                step: Number(e.target.value),
              })}
            />
          </div>

          <div className="App__controls__control">
            <label
              className="App__controls__control__label"
              htmlFor="frameId"
            >
              FRAME SIZE:
            </label>
            <input
              className="App__controls__control__input"
              id="frameId"
              type="number"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={(e) => this.setState({
                frameSize: Number(e.target.value),
              })}
            />
          </div>

          <div className="App__controls__control">
            <label
              className="App__controls__control__label"
              htmlFor="itemId"
            >
              ITEM WIDTH:
            </label>
            <input
              className="App__controls__control__input"
              id="itemId"
              type="number"
              min={0}
              step={10}
              value={itemWidth}
              onChange={(e) => this.setState({
                itemWidth: Number(e.target.value),
              })}
            />
          </div>

          <div className="App__controls__control">
            <label
              className="App__controls__control__label"
              htmlFor="animationId"
            >
              ANIMATION DURATION:
            </label>
            <input
              className="App__controls__control__input"
              id="animationId"
              type="number"
              min={0}
              step={10}
              value={animationDuration}
              onChange={(e) => this.setState({
                animationDuration: Number(e.target.value),
              })}
            />
          </div>

          <div className="App__controls__control">
            <label
              className="App__controls__control__label"
              htmlFor="infiniteId"
            >
              INFINITE:
            </label>
            <input
              className="App__controls__control__input"
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={(e) => this.setState({
                infinite: e.target.checked,
              })}
            />
          </div>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
