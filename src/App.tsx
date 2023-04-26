import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
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
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(current => ({
      ...current,
      [name]: +value,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form>
          <label htmlFor="stepInputId">
            Step:
          </label>
          <input
            id="stepInputId"
            type="text"
            name="step"
            value={this.state.step}
            onChange={this.handleChange}
          />

          <label htmlFor="frameSizeInputId">
            Frame size:
          </label>
          <input
            id="frameSizeInputId"
            type="text"
            name="frameSize"
            value={this.state.frameSize}
            onChange={this.handleChange}
          />

          <label htmlFor="itemWidthInputId">
            Input width:
          </label>
          <input
            id="itemWidthInputId"
            type="text"
            name="itemWidth"
            value={this.state.itemWidth}
            onChange={this.handleChange}
          />

          <label htmlFor="animationDurationInputId">
            Animation duration:
          </label>
          <input
            id="animationDurationInputId"
            type="text"
            name="animationDuration"
            value={this.state.animationDuration}
            onChange={this.handleChange}
          />
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
