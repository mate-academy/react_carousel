/* eslint-disable prettier/prettier */
import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

type NumericStateKey = 'itemWidth' | 'frameSize' | 'step' | 'animationDuration';

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
    infinite: true,
  };

  clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  handleNumberChange =
    (key: NumericStateKey, min: number, max: number) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = this.clamp(Number(e.target.value), min, max);

        this.setState({
          [key]: value,
        } as Pick<State, NumericStateKey>);
      };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <div className="carousel-controls">
          <label htmlFor="itemId">Item width</label>
          <input
            className="carousel-controls__input"
            id="itemId"
            data-cy="itemWidth"
            type="number"
            min={130}
            max={200}
            value={itemWidth}
            onChange={this.handleNumberChange('itemWidth', 130, 200)}
          />

          <label htmlFor="frameSize">Frame size</label>
          <input
            className="carousel-controls__input"
            id="frameSize"
            data-cy="frameSize"
            type="number"
            min={1}
            max={10}
            value={frameSize}
            onChange={this.handleNumberChange('frameSize', 1, 10)}
          />

          <label htmlFor="step">Step</label>
          <input
            className="carousel-controls__input"
            id="step"
            data-cy="step"
            type="number"
            min={1}
            max={10}
            value={step}
            onChange={this.handleNumberChange('step', 1, 10)}
          />

          <label htmlFor="animationDuration">Animation duration</label>
          <input
            className="carousel-controls__input"
            id="animationDurationя"
            data-cy="animationDuration"
            type="number"
            min={100}
            max={10000}
            step={100}
            value={animationDuration}
            onChange={this.handleNumberChange('animationDuration', 100, 10000)}
          />
        </div>
      </div>
    );
  }
}

export default App;
