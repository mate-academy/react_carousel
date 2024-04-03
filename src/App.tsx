import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { DefaultParameters } from './DefaultParameters';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
    itemWidth: DefaultParameters.ItemWidth,
    frameSize: DefaultParameters.FrameSize,
    step: DefaultParameters.Step,
    animationDuration: DefaultParameters.AnimationDuration,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />

        <h2>Choose other parameters:</h2>

        <form className="parametersForm">
          <label className="parametersForm__input">
            Item Width:
            <input
              type="number"
              name="carouselParams"
              id="itemWidth"
              className="parametersForm__input-field"
              min={50}
              onChange={event => {
                this.setState({
                  itemWidth: +event.target.value || DefaultParameters.ItemWidth,
                });
              }}
            />
          </label>

          <label className="parametersForm__input">
            Frame Size:
            <input
              type="number"
              name="carouselParams"
              id="frameSize"
              className="parametersForm__input-field"
              min={1}
              onChange={event => {
                this.setState({
                  frameSize: +event.target.value || DefaultParameters.FrameSize,
                });
              }}
            />
          </label>

          <label className="parametersForm__input">
            Step:
            <input
              type="number"
              name="carouselParams"
              className="parametersForm__input-field"
              id="step"
              min={1}
              onChange={event => {
                this.setState({
                  step: +event.target.value || DefaultParameters.Step,
                });
              }}
            />
          </label>

          <label className="parametersForm__input">
            Animation Duration:
            <input
              type="number"
              name="carouselParams"
              className="parametersForm__input-field"
              id="animationDuration"
              min={1000}
              onChange={event => {
                this.setState({
                  animationDuration:
                    +event.target.value || DefaultParameters.AnimationDuration,
                });
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
