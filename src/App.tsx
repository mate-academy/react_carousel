import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { Input } from './components/Input/Input';

interface State {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  setInfinite = (inputInfinite: HTMLButtonElement) => {
    if (!inputInfinite) {
      return;
    }

    this.setState({ infinite: true });
  };

  setStep = (inputStep: HTMLInputElement) => {
    if (!inputStep) {
      return;
    }

    this.setState({ step: +inputStep.value });
  };

  setWidth = (inputWidth: HTMLInputElement) => {
    if (!inputWidth) {
      return;
    }

    this.setState({ itemWidth: +inputWidth.value });
  };

  setFrameSize = (inputFrameSize: HTMLInputElement) => {
    if (!inputFrameSize) {
      return;
    }

    this.setState({ frameSize: +inputFrameSize.value });
  };

  setAnimationDuration = (inputAnimationDuration: HTMLInputElement) => {
    if (!inputAnimationDuration) {
      return;
    }

    this.setState({ animationDuration: +inputAnimationDuration.value });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="Inputs">

          <Input
            name="width"
            step={10}
            min={130}
            max={500}
            defaultValue={130}
            onChange={(inputElement) => {
              this.setWidth(inputElement);
            }}
          />

          <Input
            name="step"
            step={1}
            min={1}
            max={10}
            defaultValue={3}
            onChange={(inputElement) => {
              this.setStep(inputElement);
            }}
          />

          <Input
            name="frame"
            step={1}
            min={3}
            max={10}
            defaultValue={3}
            onChange={(inputElement) => {
              this.setFrameSize(inputElement);
            }}
          />

          <Input
            name="duration"
            step={100}
            min={1000}
            max={5000}
            defaultValue={1000}
            onChange={(inputElement) => {
              this.setAnimationDuration(inputElement);
            }}
          />

        </div>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          onClick={(inputElement) => {
            this.setInfinite(inputElement);
          }}
        />
      </div>
    );
  }
}

export default App;
