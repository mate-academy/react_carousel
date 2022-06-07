import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  imageSize: number;
  animationDuration: number;
  step: number;
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
    frameSize: 3,
    imageSize: 130,
    animationDuration: 300,
    step: 1,
  };

  render() {
    const {
      images,
      frameSize,
      imageSize,
      animationDuration,
      step,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          imageSize={imageSize}
          animationDuration={animationDuration}
          step={step}
        />

        <div
          className="App__controller"
        >
          <label
            htmlFor="frameSize"
            className="App__controller--label"
          >
            {'Frame size: '}
            {frameSize}

            <input
              id="frameSize"
              type="range"
              min={1}
              max={images.length}
              step={1}
              value={frameSize}
              onChange={(e) => (
                this.setState({ frameSize: +e.target.value })
              )}
            />
          </label>

          <label
            htmlFor="imageSize"
            className="App__controller--label"
          >
            {'Image size: '}
            {imageSize}

            <input
              id="imageSize"
              type="range"
              min={50}
              max={250}
              step={10}
              value={imageSize}
              onChange={(e) => (
                this.setState({ imageSize: +e.target.value })
              )}
            />
          </label>

          <label
            htmlFor="animationDuration"
            className="App__controller--label"
          >
            {'Animation duration: '}
            {animationDuration}

            <input
              id="animationDuration"
              type="range"
              min={100}
              max={1000}
              step={100}
              value={animationDuration}
              onChange={(e) => (
                this.setState({ animationDuration: +e.target.value })
              )}
            />
          </label>

          <label
            htmlFor="step"
            className="App__controller--label"
          >
            {'Step: '}
            {step}

            <input
              id="animationDuration"
              type="range"
              min={1}
              max={5}
              step={1}
              value={step}
              onChange={(e) => (
                this.setState({ step: +e.target.value })
              )}
            />
          </label>

        </div>
      </div>
    );
  }
}

export default App;
