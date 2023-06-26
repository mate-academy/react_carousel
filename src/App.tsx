import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <label className="App__label">
          Item Width:
          <input
            type="number"
            name="itemWidth"
            value={itemWidth}
            min={130}
            max={260}
            step={10}
            onChange={(e) => {
              this.setState({ itemWidth: +e.target.value });
            }}
          />
        </label>

        <label className="App__label">
          Frame Size:
          <input
            type="number"
            name="frameSize"
            value={frameSize}
            min={3}
            max={10}
            step={1}
            onChange={(e) => {
              this.setState({ frameSize: +e.target.value });
            }}
          />
        </label>

        <label className="App__label">
          Animation Duration:
          <input
            type="number"
            name="animationDuration"
            value={animationDuration}
            min={500}
            max={2500}
            step={500}
            onChange={(e) => {
              this.setState({ animationDuration: +e.target.value });
            }}
          />
        </label>

        <label className="App__label">
          step:
          <input
            type="number"
            name="step"
            value={step}
            min={1}
            max={10}
            onChange={(e) => {
              this.setState({ step: +e.target.value });
            }}
          />
        </label>

        <label className="App__label">
          Infinite:
          <input
            type="checkbox"
            name="infinite"
            onChange={(e) => {
              this.setState({ infinite: e.target.checked });
            }}
          />
        </label>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={1000}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
