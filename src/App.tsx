import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { FormInput } from './components/FormInput';

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
          <FormInput
            title="Item Width:"
            id="itemWidth"
            startValue={`${DefaultParameters.ItemWidth}`}
            onChange={event => {
              this.setState({
                itemWidth: +event.target.value || DefaultParameters.ItemWidth,
              });
            }}
          />

          <FormInput
            title="Frame Size:"
            id="frameSize"
            startValue={`${DefaultParameters.FrameSize}`}
            onChange={event => {
              this.setState({
                frameSize: +event.target.value || DefaultParameters.FrameSize,
              });
            }}
          />

          <FormInput
            title="Step"
            id="step"
            startValue={`${DefaultParameters.Step}`}
            onChange={event => {
              this.setState({
                step: +event.target.value || DefaultParameters.Step,
              });
            }}
          />

          <FormInput
            title="Animation Duration"
            id="animationDuration"
            startValue={`${DefaultParameters.AnimationDuration}`}
            onChange={event => {
              this.setState({
                animationDuration:
                  +event.target.value || DefaultParameters.AnimationDuration,
              });
            }}
          />
        </form>
      </div>
    );
  }
}

export default App;
