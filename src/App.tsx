import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration,
    } = this.state;

    const increaseItemWidth = () => {
      this.setState((prev) => ({ itemWidth: prev.itemWidth + 10 }));
    };

    const decreaseItemWidth = () => {
      this.setState((prev) => ({ itemWidth: prev.itemWidth - 10 }));
    };

    const increaseFrameSize = () => {
      this.setState((prev) => ({ frameSize: prev.frameSize + 1 }));
    };

    const decreaseFrameSize = () => {
      this.setState((prev) => ({ frameSize: prev.frameSize - 1 }));
    };

    const increaseStep = () => {
      this.setState((prev) => ({ step: prev.step + 1 }));
    };

    const decreaseStep = () => {
      this.setState((prev) => ({ step: prev.step - 1 }));
    };

    const increaseAnimationDuration = () => {
      this.setState((prev) => ({
        animationDuration: prev.animationDuration + 100,
      }));
    };

    const decreaseAnimationDuration = () => {
      this.setState((prev) => ({
        animationDuration: prev.animationDuration + 100,
      }));
    };

    const changeItemWidth = (event: ChangeEvent<HTMLInputElement>) => {
      const tmp = Number(event.target.value);

      this.setState(() => ({ itemWidth: tmp }));
    };

    const changeFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
      const tmp = Number(event.target.value);

      this.setState(() => ({ frameSize: tmp }));
    };

    const changeStep = (event: ChangeEvent<HTMLInputElement>) => {
      const tmp = Number(event.target.value);

      this.setState(() => ({ step: tmp }));
    };

    const changeAnimationDuration = (event: ChangeEvent<HTMLInputElement>) => {
      const tmp = Number(event.target.value);

      this.setState(() => ({ animationDuration: tmp }));
    };

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
        />
        <div className="App__inputs">
          <div className="App__inputs--item-container">
            <button
              type="button"
              className="App__inputs--item-button"
              onClick={increaseItemWidth}
            >
              +
            </button>
            <label className="App__inputs--item" htmlFor="itemId">
              Item Width:
              <input
                id="itemId"
                type="number"
                step={10}
                value={itemWidth}
                onChange={changeItemWidth}
              />
            </label>
            <button
              type="button"
              className="App__inputs--item-button"
              onClick={decreaseItemWidth}
            >
              -
            </button>
          </div>

          <div className="App__inputs--item-container">
            <button
              type="button"
              className="App__inputs--item-button"
              onClick={increaseFrameSize}
            >
              +
            </button>
            <label className="App__inputs--item" htmlFor="frameId">
              Frame size:
              <input
                id="frameId"
                type="number"
                value={frameSize}
                onChange={changeFrameSize}
              />
            </label>
            <button
              type="button"
              className="App__inputs--item-button"
              onClick={decreaseFrameSize}
            >
              -
            </button>
          </div>

          <div className="App__inputs--item-container">
            <button
              type="button"
              className="App__inputs--item-button"
              onClick={increaseStep}
            >
              +
            </button>
            <label className="App__inputs--item" htmlFor="stepId">
              Step:
              <input
                id="stepId"
                type="number"
                value={step}
                onChange={changeStep}
              />
            </label>
            <button
              type="button"
              className="App__inputs--item-button"
              onClick={decreaseStep}
            >
              -
            </button>
          </div>

          <div className="App__inputs--item-container">
            <button
              type="button"
              className="App__inputs--item-button"
              onClick={increaseAnimationDuration}
            >
              +
            </button>
            <label className="App__inputs--item" htmlFor="animationID">
              Animation Duration:
              <input
                id="animationID"
                type="number"
                step={100}
                value={animationDuration}
                onChange={changeAnimationDuration}
              />
            </label>
            <button
              type="button"
              className="App__inputs--item-button"
              onClick={decreaseAnimationDuration}
            >
              -
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
