import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Options } from './components/Options/Options';

interface State {
  images: string[];
  step: number
  frameSize: number
  itemWidth: number;
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
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <Options
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          changeStep={(newStep) => {
            return this.setState({ step: newStep });
          }}
          changeFrameSize={(newFrameSize) => {
            return this.setState({ frameSize: newFrameSize });
          }}
          changeItemWidth={(newItemWidth) => {
            return this.setState({ itemWidth: newItemWidth });
          }}
          changeAnimationDuration={(newAnimationDuration) => {
            return this.setState({ animationDuration: newAnimationDuration });
          }}
          changeInfinite={(newInfinite) => {
            return this.setState({ infinite: newInfinite });
          }}
        />
      </div>
    );
  }
}

export default App;
