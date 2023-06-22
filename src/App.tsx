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

  changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    this.setState((prevState: Readonly<State>) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">

        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <label htmlFor="itemId">
          Item Width
          <input
            type="number"
            id="itemId"
            name="itemWidth"
            defaultValue={itemWidth}
            onChange={this.changeInput}
            required
          />
        </label>

        <label htmlFor="frameId">
          Frame Size
          <input
            type="number"
            id="frameId"
            name="frameSize"
            defaultValue={frameSize}
            onChange={this.changeInput}
            required
          />
        </label>

        <label htmlFor="stepId">
          Step
          <input
            type="number"
            id="stepId"
            name="step"
            defaultValue={step}
            onChange={this.changeInput}
            required
          />
        </label>

        <label>
          Animation Duration
          <input
            type="number"
            name="animationDuration"
            defaultValue={animationDuration}
            onChange={this.changeInput}
            required
          />
        </label>

        <label>
          Infinite
          <input
            type="checkbox"
            name="infinite"
            checked={infinite}
            onChange={this.changeInput}
          />
        </label>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
