import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';

class App extends React.Component {
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
    stepSize: 3,
    frameSize: 3,
    infinite: false,
    itemWidth: 130,
    animationDuration: 1000,
  };

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleStepSizeInput = (e) => {
    this.setState({ stepSize: +e.target.value });
  }

  handleframeSizeInput = (e) => {
    this.setState({ frameSize: +e.target.value });
  }

  handleInfiniteLoop = (e) => {
    this.setState(state => ({ infinite: !state.infinite }));
  }

  handleitemWidthInput = (e) => {
    this.setState({ itemWidth: +e.target.value.replace(/\D+/g, '') });
  }

  animationDurationInput = (e) => {
    this.setState({ animationDuration: +e.target.value.replace(/\D+/g, '') });
  }

  render() {
    const {
      images,
      frameSize,
      stepSize,
      infinite,
      itemWidth,
      animationDuration,
    } = this.state;
    const stepOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const frameSizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <div className="App">
        <h1>
          Carousel with
          {images.length}
          {' '}
          images
        </h1>
        <Carousel
          images={images}
          step={stepSize}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <form onSubmit={this.handleSubmit}>
          <label className="app__input">
            Step:
            <select
              value={stepSize}
              onChange={this.handleStepSizeInput}
            >
              {stepOptions.map(step => (
                <option key={step} value={step}>
                  {step}
                </option>
              ))}
            </select>
          </label>
          <label className="app__input">
            Frame size:
            <select
              value={frameSize}
              onChange={this.handleframeSizeInput}
            >
              {frameSizeOptions.map(step => (
                <option key={step} value={step}>
                  {step}
                </option>
              ))}
            </select>
          </label>
          <label className="app__input">
            Infinite:
            <input
              value={infinite}
              onChange={this.handleInfiniteLoop}
              type="checkbox"
            />
          </label>
          <label className="app__input">
            Image width (px):
            <input
              type="number"
              value={itemWidth}
              onChange={this.handleitemWidthInput}
            />
          </label>
          <label className="app__input">
            animationDuration (ms):
            <input
              type="number"
              value={animationDuration}
              onChange={this.animationDurationInput}
            />
          </label>
        </form>

      </div>
    );
  }
}

export default App;
