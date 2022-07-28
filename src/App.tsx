import React from 'react';
import { Carousel } from './components/Carousel';

import './App.scss';

interface State {
  images: string[];
  duration: string | undefined;
  width: string | undefined;
  frameSize: string | undefined;
  step: string | undefined;
}

export class App extends React.Component<{}, State> {
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
    duration: '1000',
    width: '130',
    frameSize: '3',
    step: '3',
  };

  setWidth(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.currentTarget.value) {
      this.setState({ width: '130' });
    }

    this.setState({ width: e.currentTarget.value });
  }

  setDuration(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.currentTarget.value) {
      this.setState({ duration: '1000' });
    }

    this.setState({ duration: e.currentTarget.value });
  }

  setStep(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.currentTarget.value.length) {
      this.setState({ step: '3' });
    }

    this.setState({ step: e.currentTarget.value });
  }

  setFrameSize(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length === 0) {
      this.setState({ frameSize: '3' });
    }

    this.setState({ frameSize: e.currentTarget.value });
  }

  render() {
    const {
      images,
      duration,
      width,
      frameSize,
      step,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>
        <input
          type="number"
          placeholder="Step"
          className="input step"
          onChange={(e) => {
            this.setStep(e);
          }}
        />
        <input
          type="number"
          className="input width"
          placeholder="Width"
          onChange={(e) => {
            this.setWidth(e);
          }}
        />
        <input
          type="number"
          className="input duration"
          placeholder="Duration"
          onChange={(e) => {
            this.setDuration(e);
          }}
        />
        <input
          type="number"
          className="input frame"
          placeholder="Frame size"
          onChange={(e) => {
            this.setFrameSize(e);
          }}
        />

        <Carousel
          images={images}
          step={step}
          width={width}
          animationDuration={duration}
          frameSize={frameSize}
        />
      </div>
    );
  }
}
