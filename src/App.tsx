import React, { Component } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends Component<{}, State> {
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

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  setItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
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
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <div className="App__container container">
          <h1 data-cy="title" className="App__title">
            {`Carousel with ${images.length} images`}
          </h1>

          <div className="App__settings settings">
            <div className="settings__item">
              <label
                htmlFor="step"
                className="settings__label"
              >
                {'Step: '}
              </label>
              <input
                type="number"
                id="step"
                value={step}
                min={1}
                max={images.length}
                step={1}
                onChange={this.setStep}
                className="settings__input"
              />
            </div>

            <div className="settings__item">
              <label
                htmlFor="frameSize"
                className="settings__label"
              >
                {'Frame Size: '}
              </label>
              <input
                type="number"
                id="frameSize"
                value={frameSize}
                min={1}
                max={images.length}
                step={1}
                onChange={this.setFrameSize}
                className="settings__input"
              />
            </div>

            <div className="settings__item">
              <label
                htmlFor="itemWidth"
                className="settings__label"
              >
                {'Width: '}
              </label>
              <input
                type="number"
                id="itemWidth"
                value={itemWidth}
                min={130}
                max={180}
                step={10}
                onChange={this.setItemWidth}
                className="settings__input"
              />
            </div>

            <div className="settings__item">
              <label
                htmlFor="animationDuration"
                className="settings__label"
              >
                {'Animation Duration: '}
              </label>
              <input
                type="number"
                id="animationDuration"
                value={animationDuration}
                min={500}
                max={5000}
                step={500}
                onChange={this.setAnimationDuration}
                className="settings__input"
              />
            </div>

            <div className="settings__item">
              <label htmlFor="infinite">{'Infinite: '}</label>
              <input
                type="checkbox"
                id="infinityId"
                onChange={this.setInfinite}
              />
            </div>
          </div>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
