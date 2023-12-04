import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import CarouselProps from './types';

class App extends React.Component<{}, CarouselProps> {
  state: CarouselProps = {
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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    this.setState((prevState) => {
      const partialState: Partial<CarouselProps> = {
        [name]: type === 'checkbox' ? checked : Number(value),
      };

      if (name === 'images' && prevState.images) {
        partialState.images = prevState.images;
      }

      return { ...prevState, ...partialState };
    });
  };

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration, infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Carousel</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="App__controls">
          <label className="label">
            Item Width:
            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleInputChange}
              className="input"
            />
          </label>
          <label className="label">
            Frame Size:
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.handleInputChange}
              className="input"
            />
          </label>
          <label className="label">
            Step:
            <input
              type="number"
              name="step"
              value={step}
              onChange={this.handleInputChange}
              className="input"
            />
          </label>
          <label className="label">
            Animation Duration:
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleInputChange}
              className="input"
            />
          </label>
          <label className="label">
            Infinite:
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleInputChange}
              className="input"
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
