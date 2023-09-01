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
    infinite: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      checked,
      type,
    } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox'
        ? checked
        : value,
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
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="inputs">
          <label htmlFor="itemId">
            Image width:
          </label>
          <input
            type="number"
            name="itemWidth"
            id="itemId"
            value={itemWidth}
            min={10}
            max={300}
            onChange={this.handleChange}
          />

          <label htmlFor="frameId">
            Frame size:
          </label>
          <input
            type="number"
            name="frameSize"
            id="frameId"
            value={frameSize}
            min={1}
            max={10}
            onChange={this.handleChange}
          />

          <label htmlFor="stepId">
            Step:
          </label>
          <input
            type="number"
            name="step"
            id="stepId"
            value={step}
            min={1}
            max={10}
            onChange={this.handleChange}
          />

          <label htmlFor="animationDurationId">
            Animation duration:
          </label>
          <input
            type="number"
            name="animationDuration"
            id="animationDurationId"
            min={300}
            max={3000}
            step={100}
            value={animationDuration}
            onChange={this.handleChange}
          />

          <label htmlFor="infiniteId">
            Infinite:
          </label>
          <input
            type="checkbox"
            name="infinite"
            id="infiniteId"
            checked={infinite}
            onChange={this.handleChange}
          />
        </div>

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
