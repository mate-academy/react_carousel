import React from 'react';

import { Carousel } from './components/Carousel';
import { Input } from './components/Input';

import { CarouselType } from './types/Carousel';

import './App.scss';

type State = CarouselType;

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

  onChange = (name: string, value: number | boolean) => {
    this.setState(state => ({
      ...state,
      [name]: value,
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
          <Input
            name="itemWidth"
            min={100}
            max={200}
            label="Item width"
            value={itemWidth}
            onChange={this.onChange}
          />

          <Input
            name="frameSize"
            min={1}
            label="Frame Size"
            value={frameSize}
            onChange={this.onChange}
          />

          <Input
            name="step"
            min={1}
            label="Step"
            value={step}
            onChange={this.onChange}
          />

          <Input
            name="animationDuration"
            label="Animation duration"
            value={animationDuration}
            onChange={this.onChange}
          />

          <Input
            type="checkbox"
            name="infinite"
            label="Infinite"
            value={`${infinite}`}
            checked={infinite}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
