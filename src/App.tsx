import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
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
    itemWidth: 130,
    frameSize: 3,
    animationDuration: 1000,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (event.target.tagName === 'INPUT') {
      const numericValue = parseInt(value) || 0;

      switch (name) {
        case 'step':
          this.setState({ step: numericValue });
          break;
        case 'itemWidth':
          this.setState({ itemWidth: numericValue });
          break;
        case 'frameSize':
          this.setState({ frameSize: numericValue });
          break;
        case 'animationDuration':
          this.setState({ animationDuration: numericValue });
          break;
        default:
          break;
      }
    }
  };

  render() {
    const { images, step, itemWidth, frameSize, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="inputs__wrapper" onChange={this.handleInputChange}>
          <label htmlFor="itemId">
            Item Width:
            <input
              type="text"
              id="itemId"
              name="itemWidth"
              value={this.state.itemWidth}
            />
          </label>
          <label htmlFor="frameId">
            Frame Size:
            <input
              type="text"
              id="frameId"
              name="frameSize"
              value={this.state.frameSize}
            />
          </label>
          <label htmlFor="stepId">
            Step:
            <input
              type="text"
              id="stepId"
              name="step"
              value={this.state.step}
            />
          </label>
          <label htmlFor="animationDuration">
            Animation Duration:
            <input
              type="text"
              id="animationDuration"
              name="animationDuration"
              value={this.state.animationDuration}
            />
          </label>
        </div>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
