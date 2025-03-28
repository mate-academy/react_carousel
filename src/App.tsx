import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  currentStep: number;
  currentFrameSize: number;
  currentItemWidth: number;
  currentAnimationDuration: number;
  currentInfinite: boolean;
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
    currentStep: 3,
    currentFrameSize: 3,
    currentItemWidth: 130,
    currentAnimationDuration: 1000,
    currentInfinite: false,
  };

  setStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      currentStep: Number(e.target.value),
    }));
  };

  setFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      currentFrameSize: Number(e.target.value),
    }));
  };

  setCurrentItemWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      currentItemWidth: Number(e.target.value),
    }));
  };

  setAnimationDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      currentAnimationDuration: Number(e.target.value),
    }));
  };

  setInfinite = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      currentInfinite: e.target.checked,
    }));
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="inputs">
          <label htmlFor="step" className="input__label">
            Step:
            <input
              type="number"
              className="input"
              name="step"
              value={this.state.currentStep}
              onChange={this.setStep}
            />
          </label>

          <label htmlFor="itemWidth" className="input__label">
            Item width:
            <input
              type="number"
              className="input"
              name="itemWidth"
              value={this.state.currentItemWidth}
              onChange={this.setCurrentItemWidth}
            />
          </label>

          <label htmlFor="frameSize" className="input__label">
            Frame size:
            <input
              type="number"
              className="input"
              name="frameSize"
              value={this.state.currentFrameSize}
              onChange={this.setFrameSize}
            />
          </label>

          <label htmlFor="animationDuration" className="input__label">
            Animnation duration:
            <input
              type="number"
              className="input"
              name="animationDuration"
              value={this.state.currentAnimationDuration}
              onChange={this.setAnimationDuration}
            />
          </label>

          {/* <label htmlFor="animationDuration" className="checkbox__label">
            Infinite:
            <input
              type="checkbox"
              className="checkbox"
              name="infinite"
              onChange={e => this.setInfinite(e)}
            />
          </label> */}
        </div>

        <Carousel
          images={images}
          step={this.state.currentStep}
          frameSize={this.state.currentFrameSize}
          itemWidth={this.state.currentItemWidth}
          animationDuration={this.state.currentAnimationDuration}
          infinite={this.state.currentInfinite}
        />
      </div>
    );
  }
}

export default App;
