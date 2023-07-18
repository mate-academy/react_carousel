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

  setWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  setSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  setAnimation = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  setInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="box">
          <label>
            Item width:
            <input
              type="number"
              value={itemWidth}
              min={100}
              max={200}
              step={10}
              onChange={this.setWidth}
            />
          </label>

          <label>
            Number of images:
            <input
              type="number"
              value={frameSize}
              min={1}
              max={10}
              step={1}
              onChange={this.setSize}
            />
          </label>

          <label>
            Scroll images step:
            <input
              type="number"
              value={step}
              min={1}
              max={5}
              step={1}
              onChange={this.setStep}
            />
          </label>

          <label>
            Animation duration:
            <input
              type="number"
              value={animationDuration}
              min={200}
              max={2000}
              step={100}
              onChange={this.setAnimation}
            />
          </label>
          <label>
            Infinite Yes/No:
            <input
              type="checkbox"
              onChange={this.setInfinite}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
