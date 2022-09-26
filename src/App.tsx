import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  changeStepCount = (value: number) => {
    this.setState({ step: value });
  };

  changeframeSize = (value: number) => {
    this.setState({ frameSize: value });
  };

  changeItemWidth = (value: number) => {
    this.setState({ itemWidth: value });
  };

  changeAnimationDuration = (value: number) => {
    this.setState({ animationDuration: value });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="controls">
          <div className="controls__item">
            <span>Step:</span>
            {' '}
            <input
              type="number"
              min="1"
              max={frameSize}
              value={step}
              onChange={({ target }) => {
                this.changeStepCount(+target.value);
              }}
            />
          </div>

          <div className="controls__item">
            <span>Frame size:</span>
            {' '}
            <input
              type="number"
              min="3"
              max={1300 / itemWidth}
              value={frameSize}
              onChange={({ target }) => {
                this.changeframeSize(+target.value);
              }}
            />
          </div>

          <div className="controls__item">
            <span>Item width:</span>
            {' '}
            <input
              type="number"
              min="130"
              max={1300 / frameSize}
              value={itemWidth}
              step="10"
              onChange={({ target }) => {
                this.changeItemWidth(+target.value);
              }}
            />
          </div>

          <div className="controls__item">
            <span>Animation duration:</span>
            {' '}
            <input
              type="number"
              min="200"
              max="10000"
              value={animationDuration}
              step="100"
              onChange={({ target }) => {
                this.changeAnimationDuration(+target.value);
              }}
            />
          </div>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}
export default App;
