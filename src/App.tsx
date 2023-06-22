import React from 'react';
import './App.scss';
import { DEFAULT_CAROUSEL_STATE } from './constants/constants';

import { Carousel } from './components/Carousel';
import { Form } from './components/Form';

import { InputChangeCallback } from './types/InputChangeCallback';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  isInfinite: boolean;
}

class App extends React.Component<{}, State> {
  state = DEFAULT_CAROUSEL_STATE;

  handleItemWidthChange: InputChangeCallback = (event) => {
    this.setState({ itemWidth: Number(event.target.value) });
  };

  handleFrameSizeChange: InputChangeCallback = (event) => {
    this.setState({ frameSize: Number(event.target.value) });
  };

  handleStepChange: InputChangeCallback = (event) => {
    this.setState({ step: Number(event.target.value) });
  };

  handleDurationChange: InputChangeCallback = (event) => {
    this.setState({ animationDuration: Number(event.target.value) });
  };

  handleInfiniteChange: InputChangeCallback = (event) => {
    this.setState({ isInfinite: event.target.checked });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      isInfinite,
    } = this.state;

    return (
      <div className="App" data-cy="title">
        <div className="App__content">
          <h1>
            {`Carousel with ${images.length} images`}
          </h1>

          <div className="App__carousel">
            <Carousel
              images={images}
              step={step}
              frameSize={frameSize}
              itemWidth={itemWidth}
              animationDuration={animationDuration}
              infinite={isInfinite}
            />
          </div>

          <Form
            imageCount={images.length}
            itemWidth={itemWidth}
            frameSize={frameSize}
            step={step}
            animationDuration={animationDuration}
            isInfinite={isInfinite}
            handleItemWidthChange={this.handleItemWidthChange}
            handleFrameSizeChange={this.handleFrameSizeChange}
            handleStepChange={this.handleStepChange}
            handleDurationChange={this.handleDurationChange}
            handleInfiniteChange={this.handleInfiniteChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
