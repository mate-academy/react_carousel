import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

type State = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__labels">
          <label
            htmlFor="itemId"
            className="App__label"
          >
            Item Width:
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              min={130}
              max={260}
              step={10}
              onChange={(event) => {
                this.setState({
                  itemWidth: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="stepId"
            className="App__label"
          >
            Step:
            <input
              id="stepId"
              type="number"
              value={step}
              min={1}
              max={10}
              step={1}
              onChange={(event) => {
                this.setState({
                  step: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="frameId"
            className="App__label"
          >
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize}
              min={1}
              max={10}
              step={1}
              onChange={(event) => {
                this.setState({
                  frameSize: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="durationId"
            className="App__label"
          >
            Animation Duration:
            <input
              id="durationId"
              type="number"
              value={animationDuration}
              min={0}
              max={50000}
              step={500}
              onChange={(event) => {
                this.setState({
                  animationDuration: +event.target.value,
                });
              }}
            />
          </label>
        </div>

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
