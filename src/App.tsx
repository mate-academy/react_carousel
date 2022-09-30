import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  duration: number,
}

export class App extends React.Component<{}, State> {
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
    duration: 1000,
  };

  changeFrameSize = (value: number) => this.setState({ frameSize: value });

  changeItemWidth = (value: number) => this.setState({ itemWidth: value });

  changeDuration = (value: number) => this.setState({ duration: value });

  changeStepsCount = (value: number) => this.setState({ step: value });

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      duration,
    } = this.state;

    return (
      <div className="App">
        <div className="nav">
          <div className="nav__item">
            <span>Step:</span>
            <input
              className="input is-danger is-rounded"
              type="number"
              min="1"
              max={frameSize}
              value={step}
              onChange={({ target }) => {
                this.changeStepsCount(+target.value);
              }}
            />
          </div>
          <div className="nav__item">
            <span>Frame size:</span>
            <input
              className="input is-danger is-rounded"
              type="number"
              min="3"
              max={1300 / itemWidth}
              value={frameSize}
              onChange={({ target }) => {
                this.changeFrameSize(+target.value);
              }}
            />
          </div>
          <div className="nav__item">
            <span>Item width:</span>
            <input
              className="input is-danger is-rounded"
              type="number"
              min="100"
              max={1300 / frameSize}
              value={itemWidth}
              step="10"
              onChange={({ target }) => {
                this.changeItemWidth(+target.value);
              }}
            />
          </div>
          <div className="nav__item">
            <span>Animation duration:</span>
            <input
              className="input is-danger is-rounded"
              type="number"
              min="400"
              value={duration}
              step="100"
              onChange={({ target }) => {
                this.changeDuration(+target.value);
              }}
            />
          </div>
        </div>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          duration={duration}
        />
      </div>
    );
  }
}
