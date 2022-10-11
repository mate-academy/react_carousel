import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
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
  };

  changeStep = (value: number) => {
    this.setState({ step: value });
  };

  changeFrameSize = (value: number) => {
    this.setState({ frameSize: value });
  };

  changeItemWidth = (value: number) => {
    this.setState({ itemWidth: value });
  };

  changeAnimationDuration = (value: number) => {
    this.setState({ animationDuration: value });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        <h1
          className="App__carousel"
          data-cy="title"
        >
          Carousel with
          {frameSize}
          images
        </h1>

        <fieldset>
          <label htmlFor="stepId">Step</label>
          <input
            className="App__input"
            id="stepId"
            type="number"
            min="1"
            max={frameSize}
            value={step}
            onChange={({ target }) => {
              this.changeStep(+target.value);
            }}
          />

          <label htmlFor="frameId">Frame size</label>
          <input
            className="App__input"
            id="frameId"
            type="number"
            min="3"
            max="10"
            value={frameSize}
            onChange={({ target }) => {
              this.changeFrameSize(+target.value);
            }}
          />
          <label htmlFor="itemId">Item width</label>
          <input
            className="App__input"
            id="itemId"
            type="number"
            min="130"
            max={1300 / frameSize}
            value={itemWidth}
            step="10"
            onChange={({ target }) => {
              this.changeItemWidth(+target.value);
            }}
          />
          <label htmlFor="animationDuration">Animation duration</label>
          <input
            className="App__input"
            id="animationDuration"
            type="number"
            min="400"
            value={animationDuration}
            step="100"
            onChange={({ target }) => {
              this.changeAnimationDuration(+target.value);
            }}
          />
        </fieldset>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>

    );
  }
}

export default App;
