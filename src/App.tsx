import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  duration: string | undefined;
  width: string | undefined;
  frameSize: string | undefined;
  step: string | undefined;
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
    duration: '1000',
    width: '130',
    frameSize: '3',
    step: '3',
  };

  setDuration(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      this.setState({ duration: '1000' });
    }

    this.setState({ duration: event.currentTarget.value });
  }

  setWidth(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      this.setState({ width: '130' });
    }

    this.setState({ width: event.currentTarget.value });
  }

  setframeSize(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value.length === 0) {
      this.setState({ frameSize: '3' });
    }

    this.setState({ frameSize: event.currentTarget.value });
  }

  setStep(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.currentTarget.value.length) {
      this.setState({ step: '3' });
    }

    let step = '0';

    if (+event.currentTarget.value <= 0
      || +event.currentTarget.value > this.state.images.length) {
      step = '3';
    } else {
      step = event.currentTarget.value;
    }

    this.setState({ step });
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <input
          type="number"
          placeholder="step (default: 3)"
          id="step"
          onChange={(e) => {
            this.setStep(e);
          }}
        />
        <input
          type="number"
          placeholder="width (default: 130)"
          id="width"
          onChange={(e) => {
            this.setWidth(e);
          }}
        />
        <input
          type="number"
          placeholder="duration (default: 1000)"
          id="duration"
          onChange={(e) => {
            this.setDuration(e);
          }}
        />
        <input
          type="number"
          placeholder="frameSize (default: 3)"
          id="frameSize"
          onChange={(e) => {
            this.setframeSize(e);
          }}
        />

        <Carousel
          images={images}
          step={this.state.step}
          width={this.state.width}
          animationDuration={this.state.duration}
          frameSize={this.state.frameSize}
        />
      </div>
    );
  }
}

export default App;
