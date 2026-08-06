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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__controls">
          <label htmlFor="itemId">
            Item Width:
            <input
              id="itemId"
              name="itemWidth"
              type="number"
              value={itemWidth}
              onChange={this.handleNumberChange}
            />
          </label>

          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              name="frameSize"
              type="number"
              value={frameSize}
              onChange={this.handleNumberChange}
            />
          </label>

          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              name="step"
              type="number"
              value={step}
              onChange={this.handleNumberChange}
            />
          </label>

          <label htmlFor="animationDurationId">
            Animation Duration:
            <input
              id="animationDurationId"
              name="animationDuration"
              type="number"
              value={animationDuration}
              onChange={this.handleNumberChange}
            />
          </label>

          <label htmlFor="infiniteId">
            Infinite:
            <input
              id="infiniteId"
              name="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.handleCheckboxChange}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
