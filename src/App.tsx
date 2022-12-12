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

  componentDidMount() {
    const buttons: NodeListOf<HTMLButtonElement>
      = document.querySelectorAll('.Carousel__button');

    if (!buttons) {
      return;
    }

    buttons.forEach(button => button.addEventListener('click', () => {
      this.setState({ infinite: true });
    }));
  }

  setStep = () => {
    const inputStep: HTMLInputElement | null
      = document.querySelector('#stepId');

    if (!inputStep) {
      return;
    }

    this.setState({ step: +inputStep.value });
  };

  setWidth = () => {
    const inputWidth: HTMLInputElement | null
      = document.querySelector('#itemId');

    if (!inputWidth) {
      return;
    }

    this.setState({ itemWidth: +inputWidth.value });
  };

  setFrameSize = () => {
    const inputFrameSize: HTMLInputElement | null
      = document.querySelector('#frameId');

    if (!inputFrameSize) {
      return;
    }

    this.setState({ frameSize: +inputFrameSize.value });
  };

  setAnimationDuration = () => {
    const inputAnimationDuration: HTMLInputElement | null
      = document.querySelector('#durationId');

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
            onChange={this.setWidth}
          />

          <Input
            name="step"
            step={1}
            min={1}
            max={10}
            defaultValue={3}
            onChange={this.setStep}
          />

          <Input
            name="frame"
            step={1}
            min={3}
            max={10}
            defaultValue={3}
            onChange={this.setFrameSize}
          />

          <Input
            name="duration"
            step={100}
            min={1000}
            max={5000}
            defaultValue={1000}
            onChange={this.setAnimationDuration}
          />

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
