import React from 'react';

import './App.scss';
import Carousel from './components/Carousel/Carousel';
import Form from './components/Form/Form';
import { State } from './types/State';

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
    offSet: 0,
    infinite: false,
  };

  setStep = (newStep: number) => {
    this.setState({ step: newStep });
  };

  setFrameSize = (newFrameSize: number) => {
    this.setState(prevState => {
      const maxOffset =
        (prevState.images.length - newFrameSize) * prevState.itemWidth;
      const offset = prevState.offSet;

      return {
        frameSize: newFrameSize,
        offSet: offset > maxOffset ? Math.max(maxOffset, 0) : offset,
      };
    });
  };

  setItemWidth = (newItemWidth: number) => {
    this.setState(prevState => {
      const maxOffset =
        (prevState.images.length - prevState.frameSize) * newItemWidth;
      const offset = prevState.offSet;

      return {
        itemWidth: newItemWidth,
        offSet: offset > maxOffset ? Math.max(maxOffset, 0) : offset,
      };
    });
  };

  setAnimationDuration = (dur: number) => {
    this.setState({ animationDuration: dur });
  };

  setOffSet = (offSet: number) => {
    this.setState({ offSet: offSet });
  };

  setInfinite = (infiniteVal: boolean) => {
    this.setState({ infinite: infiniteVal });
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">
          Carousel with {images.length} images
        </h1>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          offSet={this.state.offSet}
          onChangeoffSet={this.setOffSet}
          infinite={this.state.infinite}
        />

        <Form
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          onStepChange={this.setStep}
          onFrameSizeChange={this.setFrameSize}
          onItemWidthChange={this.setItemWidth}
          onAnimationDurationChange={this.setAnimationDuration}
          infinite={this.state.infinite}
          OnChangeInfinite={this.setInfinite}
        />
      </div>
    );
  }
}

export default App;
