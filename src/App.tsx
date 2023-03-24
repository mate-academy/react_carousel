import React, { ChangeEvent } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Settings } from './components/Settings';

interface State {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const initialState: State = {
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
  frameSize: 3,
  step: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

class App extends React.Component<{}, State> {
  readonly state = { ...initialState };

  handleChangeWidth = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (+value >= 100) {
      this.setState({ itemWidth: +value });
    }
  };

  handleChangeFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (+value >= 1 && +value <= 5) {
      this.setState({ frameSize: +value });
    }
  };

  handleChangeStepSize = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (+value >= 1) {
      this.setState({ step: +value });
    }
  };

  handleChangeDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (+value >= 0) {
      this.setState({ animationDuration: +value });
    }
  };

  toggleInfinite = (isChecked: boolean) => {
    this.setState({ infinite: isChecked });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
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
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <Settings
          duration={animationDuration}
          frameSize={frameSize}
          infinite={infinite}
          step={step}
          itemWidth={itemWidth}
          onDurationChange={this.handleChangeDuration}
          onFrameSizeChange={this.handleChangeFrameSize}
          onInfiniteToggle={this.toggleInfinite}
          onStepSizeChange={this.handleChangeStepSize}
          onWidthChange={this.handleChangeWidth}
        />
      </div>
    );
  }
}

export default App;
