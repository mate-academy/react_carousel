import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Form, INITIAL_ITEM_WIDTH } from './components/Form';

interface State {
  images: string[];
  itemWidth: number,
  step: number,
  frameSize: number,
  animationDuration: number,
  infinite: boolean,
}

const initialImages: string[] = [
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
];

const initialState: State = {
  images: [...initialImages],
  itemWidth: 130,
  step: 3,
  frameSize: 3,
  animationDuration: 1000,
  infinite: false,
};

class App extends React.Component<{}, State> {
  readonly state = {
    ...initialState,
  };

  changeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const width = +event.target.value;

    if (+width >= INITIAL_ITEM_WIDTH) {
      this.setState({ itemWidth: width });
    }
  };

  changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const step = +event.target.value;

    if (step > 0) {
      this.setState({ step });
    }
  };

  changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = +event.target.value;

    if (size > 0) {
      this.setState({ frameSize: size });
    }
  };

  changeAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const duration = +event.target.value;

    if (duration > 0) {
      this.setState({ animationDuration: duration });
    }
  };

  changeInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          step={step}
          frameSize={frameSize}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <Form
          itemWidth={itemWidth}
          onChangeWidth={this.changeItemWidth}
          step={step}
          onStepChange={this.changeStep}
          frameSize={frameSize}
          onFrameChange={this.changeFrameSize}
          animationDuration={animationDuration}
          onDurationChange={this.changeAnimationDuration}
          onInfiniteChange={this.changeInfinite}
          imagesLength={images.length}
        />
      </div>
    );
  }
}

export default App;
