import React from 'react';
import './styles/main.scss';

import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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

  updateStep = (newStep: number) => {
    this.setState({ step: newStep });
  };

  updateItemWidth = (newWidth: number) => {
    this.setState({ itemWidth: newWidth });
  };

  updateAnimationDuration = (newDuration: number) => {
    this.setState({ animationDuration: newDuration });
  };

  updateInfinite = (newInfinite: boolean) => {
    this.setState({ infinite: newInfinite });
  };

  updateFrameSize = (newSize: number) => {
    this.setState({ frameSize: newSize });
  };

  render() {
    const {
      images,
      frameSize,
      step,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          updateFrameSize={this.updateFrameSize}
          step={step}
          updateStep={this.updateStep}
          itemWidth={itemWidth}
          updateItemWidth={this.updateItemWidth}
          animationDuration={animationDuration}
          updateAnimationDuration={this.updateAnimationDuration}
          infinite={infinite}
          updateInfinite={this.updateInfinite}
        />
      </div>
    );
  }
}

export default App;
