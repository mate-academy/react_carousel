import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Form } from './components/Form';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const imagesArray = [
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
];

class App extends React.PureComponent<{}, State> {
  state = {
    images: imagesArray,
    itemWidth: 130,
    frameSize: 1,
    step: 1,
    animationDuration: 1000,
    infinite: false,
  };

  setWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        <Carousel
          photos={this.state.images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
          step={step}
          infinite={infinite}
        />

        <Form
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
          setWidth={this.setWidth}
          setFrameSize={this.setFrameSize}
          setStep={this.setStep}
          setAnimationDuration={this.setAnimationDuration}
          setInfinite={this.setInfinite}
        />
      </div>
    );
  }
}

export default App;
