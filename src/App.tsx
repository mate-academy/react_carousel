import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (

      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div>
          <label htmlFor="stepId">
            Item Width:
            <input
              type="number"
              name="stepId"
              value={itemWidth}
              onChange={(e) => this
                .setState({ itemWidth: Number(e.target.value) })}
            />
          </label>
        </div>
        <div>
          <label htmlFor="frameSize">
            Frame Size:
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={(e) => this
                .setState({ frameSize: Number(e.target.value) })}
            />
          </label>
        </div>
        <div>
          <label htmlFor="step">
            Step:
            <input
              type="number"
              name="step"
              value={step}
              onChange={(e) => this.setState({ step: Number(e.target.value) })}
            />
          </label>
        </div>
        <div>
          <label htmlFor="animationDuration">
            Animation Duration:
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={(e) => this
                .setState({ animationDuration: Number(e.target.value) })}
            />
          </label>
        </div>
        <Carousel
          step={step}
          images={images}
          frameSize={frameSize}
          imageWidth={itemWidth}
          animationDuration={animationDuration}
          infinite
        />
      </div>

    );
  }
}
