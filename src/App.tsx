import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export interface State {
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

  handleItemWidthChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ itemWidth: +event.target.value });
  }

  handleFrameSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ frameSize: +event.target.value });
  }

  handleStepChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ step: +event.target.value });
  }

  handleDurationChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ animationDuration: +event.target.value });
  }

  handleInfiniteChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ infinite: event.target.checked });
  }

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
        <h1 className="title" data-cy="title">Carousel with {images.length} images</h1>

        <form
          className="settings"
          action="#"
          method="get"
        >
          <label className="settings__title" htmlFor="itemId">
            Image size:
            <input
              className="settings__input"
              type="number"
              name="itemWidth"
              id="itemId"
              step={10}
              value={itemWidth}
              onChange={(event) => this.handleItemWidthChange(event)}
            />
          </label>

          <label className="settings__title" htmlFor="frameId">
            Frame size:
            <input
              className="settings__input"
              type="number"
              name="frameSize"
              id="frameId"
              value={frameSize}
              step={1}
              onChange={(event) => this.handleFrameSizeChange(event)}
            />
          </label>

          <label className="settings__title" htmlFor="stepId">
            Step:
            <input
              className="settings__input"
              type="number"
              name="step"
              id="stepId"
              step={1}
              value={step}
              onChange={(event) => this.handleStepChange(event)}
            />
          </label>

          <label className="settings__title" htmlFor="animationDuration">
            Animation Duration:
            <input
              className="settings__input"
              type="number"
              name="animationDuration"
              id="animationDuration"
              value={animationDuration}
              step={100}
              onChange={(event) => this.handleDurationChange(event)}
            />
          </label>

          <label className="settings__title" htmlFor="isInfinite">
            Infinite:
            <input
              className="settings__checkbox"
              type="checkbox"
              name="isInfinite"
              id="isInfinite"
              onChange={(event) => this.handleInfiniteChange(event)}
            />
          </label>
        </form>

        <Carousel
          images={images}
          imageSize={itemWidth}
          numberOfVisible={frameSize}
          step={step}
          animationDuration={animationDuration}
          isInfinite={infinite}
        />
      </div>
    );
  }
}

export default App;
