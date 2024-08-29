import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
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

  changeStep = (newStep: number) => {
    if (newStep > 0 && newStep <= this.state.images.length) {
      this.setState({ step: newStep });
    }
  };

  changeFrameSize = (newFrameSize: number) => {
    if (newFrameSize > 0 && newFrameSize <= this.state.images.length) {
      this.setState({ frameSize: newFrameSize });
    }
  };

  changeItemWidth = (newItemWidth: number) => {
    if (newItemWidth > 0) {
      this.setState({ itemWidth: newItemWidth });
    }
  };

  changeAnimationDuration = (newAnimationDuration: number) => {
    if (newAnimationDuration > 0) {
      this.setState({ animationDuration: newAnimationDuration });
    }
  };

  changeInfinite = (newInfinite: boolean) => {
    this.setState({ infinite: newInfinite });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <label htmlFor="stepId">Step: </label>
        <input
          type="number"
          id="stepId"
          min={1}
          max={images.length}
          value={step}
          onChange={event => {
            this.changeStep(+event.target.value);
          }}
        />

        <label htmlFor="frameId">Frame Size: </label>
        <input
          type="number"
          id="frameId"
          min={1}
          max={images.length}
          value={frameSize}
          onChange={event => {
            this.changeFrameSize(+event.target.value);
          }}
        />

        <label htmlFor="itemId">Item Width: </label>
        <input
          type="number"
          id="itemId"
          min={1}
          value={itemWidth}
          onChange={event => {
            this.changeItemWidth(+event.target.value);
          }}
        />

        <label htmlFor="animationDuration">Animation Duration: </label>
        <input
          type="number"
          id="animationDuration"
          min={1}
          value={animationDuration}
          onChange={event => {
            this.changeAnimationDuration(+event.target.value);
          }}
        />

        <label htmlFor="infinite">Infinite: </label>
        <input
          type="checkbox"
          id="infinite"
          checked={infinite}
          onChange={event => {
            this.changeInfinite(event.target.checked);
          }}
        />

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
