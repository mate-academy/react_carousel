import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinity: boolean,
}

export class App extends React.Component<{}, State> {
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
    infinity: false,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title" data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinity={infinity}
        />
        <div className="App__labels">
          <label
            htmlFor="stepId"
            className="App__label"
          >
            Step:
            <input
              type="number"
              id="stepId"
              value={step}
              min={1}
              max={images.length}
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
            Frame size:
            <input
              type="number"
              id="frameId"
              value={frameSize}
              min={1}
              max={images.length}
              step={1}
              onChange={(event) => {
                this.setState({
                  frameSize: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="itemId"
            className="App__label"
          >
            Item width:
            <input
              type="number"
              id="itemId"
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
            htmlFor="animationId"
            className="App__label"
          >
            Animation:
            <input
              type="number"
              id="animationId"
              value={animationDuration}
              min={1000}
              max={5000}
              step={200}
              onChange={(event) => {
                this.setState({
                  animationDuration: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="infinityId"
            className="App__label"
          >
            Infinity:
            <input
              type="checkbox"
              id="infinityId"
              onChange={(event) => {
                this.setState({
                  infinity: event.target.checked,
                });
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}
