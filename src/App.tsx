import React from 'react';
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
      images, itemWidth, frameSize, step, animationDuration,
    } = this.state;

    const inputWidth = { width: 300 };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title'>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />

        {`Emoji Width (${itemWidth})`}
        <input
          type="range"
          name="itemWidth"
          style={inputWidth}
          value={itemWidth}
          step={5}
          min={60}
          max={200}
          onChange={event => {
            this.setState({ itemWidth: +event.target.value });
          }}
        />
        {`Frame Size (${frameSize})`}
        <input
          type="range"
          name="frameSize"
          style={inputWidth}
          value={frameSize}
          step={1}
          min={1}
          max={5}
          onChange={event => {
            this.setState({ frameSize: +event.target.value });
          }}
        />
        {`Step (${step})`}
        <input
          type="range"
          name="step"
          style={inputWidth}
          value={step}
          step={1}
          min={1}
          max={5}
          onChange={event => {
            this.setState({ step: +event.target.value });
          }}
        />
        {`Animation Duration (${animationDuration})`}
        <input
          type="range"
          name="animationDuration"
          style={inputWidth}
          value={animationDuration}
          step={100}
          min={100}
          max={3000}
          onChange={event => {
            this.setState({ animationDuration: +event.target.value });
          }}
        />
      </div>
    );
  }
}

export default App;
