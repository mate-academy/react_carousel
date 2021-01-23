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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    error: false,
  };

  handle = (event) => {
    const { name, value } = event.target;
    const { images, error } = this.state;

    if (value > images.length && (name === 'frameSize' || name === 'step')) {
      this.setState({ error: true });

      return;
    }

    if (error) {
      this.setState({ error: false });
    }

    this.setState({ [name]: value });
  }

  render() {
    const {
      images,
      animationDuration,
      frameSize,
      itemWidth,
      step,
      error,
    } = this.state;

    return (
      <div className="App">
        <h1>
          Carousel with
          {images.length}
          {' '}
          images
        </h1>

        <form>
          <label>
            Step
            <input
              name="step"
              type="text"
              value={step}
              onChange={this.handle}
            />
          </label>
          <label>
            Size of frame
            <input
              name="frameSize"
              type="text"
              value={frameSize}
              onChange={this.handle}
            />
          </label>
          <label>
            Width of images
            <input
              name="itemWidth"
              type="text"
              value={itemWidth}
              onChange={this.handle}
            />
          </label>
          <label>
            Duration of animation
            <input
              name="animationDuration"
              type="text"
              value={animationDuration}
              onChange={this.handle}
            />
          </label>
        </form>

        {error ? (
          <p className="error">
            You cannot use a size of step or frame larger then the number of
            images
          </p>
        ) : (
          <div className="container">
            <Carousel
              images={images}
              step={step}
              frameSize={frameSize}
              itemWidth={itemWidth}
              animationDuration={animationDuration}
            />
          </div>
        )}

      </div>
    );
  }
}

export default App;
