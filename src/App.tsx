// import { setPriority } from 'os';
import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  step: number,
  frameSize: number,
  animationDuration: number,
  infinity: boolean,
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
    infinity: false,
  };

  render() {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>
        <label htmlFor="itemWidth" className="App__label">
          Item Width:
          <input
            id="itemWidth"
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
        <label htmlFor="frameSize" className="App__label">
          Frame Size:
          <input
            id="frameSize"
            type="number"
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
        <label htmlFor="step" className="App__label">
          Step:
          <input
            id="step"
            type="number"
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
        <label htmlFor="animation" className="App__label">
          Animation:
          <input
            id="animation"
            type="number"
            value={animationDuration}
            min={500}
            max={5000}
            step={500}
            onChange={(event) => {
              this.setState({
                animationDuration: +event.target.value,
              });
            }}
          />
        </label>
        <label htmlFor="infinity" className="App__label">
          Infinity:
          <input
            id="infinity"
            type="checkbox"
            onChange={(e) => {
              this.setState({
                infinity: e.target.checked,
              });
            }}
          />
        </label>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinity={infinity}
        />
      </div>
    );
  }
}

export default App;
