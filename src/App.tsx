import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { CarouselForm } from './components/CarouselForm/CarouselForm';

interface State {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  isInfinite: boolean,
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
    isInfinite: false,
  };

  handleItemWidthChange = (newItemWidth: number) => {
    this.setState({ itemWidth: newItemWidth });
  };

  handleFrameSizeChange = (newFrameSize: number) => {
    this.setState({ frameSize: newFrameSize });
  };

  handleDurationChange = (newDuration: number) => {
    this.setState({ animationDuration: newDuration });
  };

  handleStepChange = (newStep: number) => {
    this.setState({ step: newStep });
  };

  handleIsInfiniteChange = (newIsInfinite: boolean) => {
    this.setState({ isInfinite: newIsInfinite });
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
      <div className="App">
        <CarouselForm
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          duration={animationDuration}
          isInfinite={isInfinite}
          onItemWidthChange={this.handleItemWidthChange}
          onframeSizeChange={this.handleFrameSizeChange}
          onDurationChange={this.handleDurationChange}
          onIsInfiniteChange={this.handleIsInfiniteChange}
          onStepChange={this.handleStepChange}
        />

        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={isInfinite}
        />
      </div>
    );
  }
}

export default App;
