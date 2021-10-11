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
    infinite: false,
  };

  setStep = (e: React.FormEvent<HTMLInputElement>) => {
    const output = document.querySelector('.width');

    if (output) {
      output.textContent = e.currentTarget.value;
    }

    this.setState({ step: +e.currentTarget.value });
  };

  setFrameSize = (e: React.FormEvent<HTMLInputElement>) => {
    const output = document.querySelector('.frame-size');

    if (output) {
      output.textContent = e.currentTarget.value;
    }

    this.setState({ frameSize: +e.currentTarget.value });
  };

  setItemWidth = (e: React.FormEvent<HTMLInputElement>) => {
    const output = document.querySelector('.item-width');

    if (output) {
      output.textContent = e.currentTarget.value;
    }

    this.setState({ itemWidth: +e.currentTarget.value });
  };

  setAnimationDuration = (e: React.FormEvent<HTMLInputElement>) => {
    const output = document.querySelector('.animation-duration');

    if (output) {
      output.textContent = e.currentTarget.value;
    }

    this.setState({ animationDuration: +e.currentTarget.value });
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1>
          Carousel with
          {images.length}
          images
        </h1>

        <Carousel
          {...this.state}
        />
        <form className="form" action="#">
          <label htmlFor="width">
            Step:
            <output className="width" name="step" htmlFor="width">3</output>
            <input
              type="range"
              defaultValue="3"
              name="number"
              id="width"
              min="1"
              max="5"
              onInput={this.setStep}
            />
          </label>

          <label htmlFor="frameSize">
            Frame size:
            <output className="frame-size" name="frameSize"> 3 </output>
            <input
              type="range"
              defaultValue="3"
              name="frameSize"
              id="frameSize"
              min="1"
              max="5"
              onInput={this.setFrameSize}
            />
          </label>

          <label htmlFor="itemWidth">
            Image width:
            <output className="item-width" name="itemWidth"> 130 </output>
            <input
              type="range"
              defaultValue="130"
              name="itemWidth"
              id="itemWidth"
              min="80"
              max="200"
              onInput={this.setItemWidth}
            />
          </label>

          <label htmlFor="animationDuration">
            Animation duration:
            <output className="animation-duration" name="animationDuration"> 1000 </output>
            <input
              type="range"
              defaultValue="1000"
              name="animation-duration"
              id="animation duration"
              min="500"
              max="4000"
              onInput={this.setAnimationDuration}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
