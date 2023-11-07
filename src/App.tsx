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
    infinite: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => {
      const { name, value } = event.target;

      return {
        ...prevState,
        [name]: Number(value),
      };
    });
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label>
          Item Width:
          <input
            name="itemWidth"
            type="number"
            value={this.state.itemWidth}
            onChange={this.handleInputChange}
          />
        </label>

        <label>
          Frame Size:
          <input
            name="frameSize"
            type="number"
            value={this.state.frameSize}
            onChange={this.handleInputChange}
          />
        </label>

        <label>
          Step:
          <input
            name="step"
            type="number"
            value={this.state.step}
            onChange={this.handleInputChange}
          />
        </label>

        <label>
          Animation Duration (ms):
          <input
            name="animationDuration"
            type="number"
            value={this.state.animationDuration}
            onChange={this.handleInputChange}
          />
        </label>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />
      </div>
    );
  }
}

export default App;
