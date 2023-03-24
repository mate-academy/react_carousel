import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
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

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    const changeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ itemWidth: +event.target.value });
    };

    const changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ frameSize: +event.target.value });
    };

    const changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ step: +event.target.value });
    };

    const changeAnimationDuration = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      this.setState({ animationDuration: +event.target.value });
    };

    const changeInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ infinite: event.currentTarget.checked });
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>
        <div className="App__inputs">
          <label
            htmlFor="itemId"
            className="App__label"
          >
            Item width
            <input
              className="App__input"
              type="number"
              id="itemId"
              value={itemWidth}
              min={100}
              max={230}
              step={10}
              onChange={changeItemWidth}
            />
          </label>

          <label
            htmlFor="frameId"
            className="App__label"
          >
            Frame size
            <input
              className="App__input"
              type="number"
              id="frameId"
              value={frameSize}
              min={1}
              max={10}
              onChange={changeFrameSize}
            />
          </label>

          <label
            htmlFor="stepId"
            className="App__label"
          >
            Step
            <input
              className="App__input"
              type="number"
              id="stepId"
              value={step}
              min={1}
              max={9}
              onChange={changeStep}
            />
          </label>

          <label
            htmlFor="animationDurationInput"
            className="App__label"
          >
            Animation Duration
            <input
              className="App__input"
              type="number"
              id="animationDurationInput"
              value={animationDuration}
              step={100}
              onChange={changeAnimationDuration}
            />
          </label>

          <label
            htmlFor="infiniteInput"
            className="App__label"
          >
            Infinite
            <input
              className="App__input"
              type="checkbox"
              id="infiniteInput"
              checked={infinite}
              onChange={changeInfinite}
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
