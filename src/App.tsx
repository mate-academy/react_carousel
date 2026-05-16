import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
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

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof State;
    const { value, type, checked } = e.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : Number(value),
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" title="Carousel">
          Carousel with {images.length} images
        </h1>

        <div className="Config-Panel">
          <label htmlFor="itemId">
            Item Width (px):
            <input
              id="itemId"
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="frameId">
            Frame Size :
            <input
              id="frameId"
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              name="step"
              value={step}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="animationId">
            Animation Duration (ms):
            <input
              id="animationId"
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>
          <label className="checkbox-label" htmlFor="infiniteId">
            <input
              id="infiniteId"
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleInputChange}
            />
            Infinite Mode
          </label>
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
