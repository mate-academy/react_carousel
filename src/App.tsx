import React, { ChangeEvent } from 'react';
import Carousel from './components/Carousel';
import './App.scss';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemId">
          itemWidth
          <input
            id="itemId"
            type="number"
            name="itemWidth"
            value={itemWidth}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="frameId">
          frameSize
          <input
            id="frameId"
            type="number"
            name="frameSize"
            value={frameSize}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="stepId">
          step
          <input
            id="stepId"
            type="number"
            name="step"
            value={step}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="fnimationDurationId">
          animationDuration
          <input
            id="fnimationDurationId"
            type="number"
            name="animationDuration"
            value={animationDuration}
            onChange={this.handleChange}
          />
        </label>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
