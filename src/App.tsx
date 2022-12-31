import React from 'react';
import { Carousel } from './components/Carousel';

import './App.scss';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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

  setStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +e.currentTarget.value });
  };

  setFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +e.currentTarget.value });
  };

  setItemWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +e.currentTarget.value });
  };

  setAnimationDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +e.currentTarget.value });
  };

  setInfinite = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: e.currentTarget.checked });
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
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="wrapper">
          <form action="#" className="form">
            <div className="form__block">
              <label htmlFor="stepId" className="form__label">
                {'Step '}
              </label>
              <input
                type="number"
                id="stepId"
                className="form__input"
                defaultValue={step}
                onChange={this.setStep}
                min="1"
                max={images.length}
              />
            </div>

            <div className="form__block">
              <label htmlFor="frameSizeId" className="form__label">
                {'Frame size '}
              </label>
              <input
                type="number"
                id="frameSizeId"
                className="form__input"
                defaultValue={frameSize}
                onChange={this.setFrameSize}
                min="1"
                max={images.length}
              />
            </div>

            <div className="form__block">
              <label htmlFor="itemWidthId" className="form__label">
                {'Item Width '}
              </label>
              <input
                type="number"
                id="itemWidthId"
                className="form__input"
                defaultValue={itemWidth}
                onChange={this.setItemWidth}
                min="40"
              />
            </div>

            <div className="form__block">
              <label
                htmlFor="animationDurationId"
                className="form__label"
              >
                {'Animation duration '}
              </label>
              <input
                type="number"
                id="animationDurationId"
                className="form__input"
                defaultValue={animationDuration}
                onChange={this.setAnimationDuration}
                min="0"
                max="5000"
              />
            </div>

            <div className="form__block checkbox">
              <label
                htmlFor="infiniteId"
                className="form__label checkbox"
              >
                {'Infinite '}
              </label>
              <input
                type="checkbox"
                id="infiniteId"
                className="form__input"
                onChange={this.setInfinite}
              />
            </div>
          </form>
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
