import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  inputs: {
    itemWidth: number;
    frameSize: number;
    step: number;
    animationDuration: number;
  };
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
    inputs: {
      itemWidth: 130,
      frameSize: 3,
      step: 3,
      animationDuration: 1000,
      infinite: false,
    },
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: value, // Оновлюємо значення конкретного поля
      },
    }));
  };

  render() {
    const { images, inputs } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="container">
          <label htmlFor="itemId">
            Enter images width (px)
            <input
              type="number"
              id="itemId"
              name="itemWidth"
              value={inputs.itemWidth}
              onChange={this.handleInputChange}
              placeholder="Enter images width (px)"
            />
          </label>

          <label htmlFor="frameId">
            Enter the number of images displayed at the same time
            <input
              type="number"
              id="frameId"
              name="frameSize"
              value={inputs.frameSize}
              onChange={this.handleInputChange}
              placeholder="Enter the number of images"
              max={images.length}
            />
          </label>

          <label htmlFor="stepId">
            Enter number of images scrolled per click
            <input
              type="number"
              id="stepId"
              name="step"
              value={inputs.step}
              onChange={this.handleInputChange}
              placeholder="Enter number of images scrolled per click"
            />
          </label>

          <label htmlFor="animationDur">
            Enter animation duration (ms)
            <input
              type="number"
              name="animationDuration"
              value={inputs.animationDuration}
              onChange={this.handleInputChange}
              placeholder="Enter animation duration (ms)"
            />
          </label>
        </div>

        <Carousel
          images={images}
          frameSize={inputs.frameSize}
          step={inputs.step}
          itemWidth={inputs.itemWidth}
          animationDuration={inputs.animationDuration}
          infinite={inputs.infinite}
        />
      </div>
    );
  }
}

export default App;
