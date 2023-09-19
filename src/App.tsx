import React from 'react';

import { Carousel, CarouselProps } from './components/Carousel';
import { LabeledInput } from './components/LabeledInput';

import './App.scss';

type AppState = CarouselProps;

class App extends React.Component<{}, AppState> {
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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.type === 'number'
      ? +e.target.value
      : e.target.checked;

    this.setState(state => ({
      ...state,
      [e.target.name]: data,
    }));
  };

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration, infinite,
    }
      = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="App__inputs">
          <LabeledInput
            name="itemWidth"
            min={100}
            max={200}
            label="Item width"
            value={itemWidth}
            onChange={this.handleChange}
          />

          <LabeledInput
            name="frameSize"
            min={1}
            label="Frame Size"
            value={frameSize}
            onChange={this.handleChange}
          />

          <LabeledInput
            name="step"
            min={1}
            label="Step"
            value={step}
            onChange={this.handleChange}
          />

          <LabeledInput
            name="animationDuration"
            label="Animation duration"
            value={animationDuration}
            onChange={this.handleChange}
          />

          <LabeledInput
            type="checkbox"
            name="infinite"
            label="Infinite"
            value={`${infinite}`}
            checked={infinite}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
