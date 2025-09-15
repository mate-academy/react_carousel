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

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" > Carousel with {images.length} images</h1>
        <div className="inputs">
          <label className="inputs__item" htmlFor="stepId">
            Step
            <input
              id="stepId"
              type="number"
              value={step}
              onChange={event => {
                const v = Math.max(
                  1,
                  Math.floor(Number(event.target.value) || 0),
                );

                if (Number.isFinite(v)) {
                  this.setState({ step: Math.min(10, v) });
                }
              }}
            />
          </label>

          <label className="inputs__item" htmlFor="frameId">
            FrameSize
            <input
              id="frameId"
              type="number"
              value={frameSize}
              onChange={event => {
                const v = Math.max(
                  1,
                  Math.floor(Number(event.target.value) || 0),
                );
                

                if (Number.isFinite(v)) {
                  this.setState({ frameSize: Math.min(10, v) });
                }
              }}
            />
          </label>

          <label className="inputs__item" htmlFor="itemId">
            itemWidth
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={event => {
                const v = Math.max(
                  1,
                  Math.floor(Number(event.target.value) || 0),
                );

                if (Number.isFinite(v)) {
                  this.setState({ itemWidth: Math.min(500, v)});
                }
              }}
            />
          </label>

          <label className="inputs__item" htmlFor="animaId">
            animationDuration
            <input
              className="item"
              id="animaId"
              type="number"
              value={animationDuration}
              onChange={event => {
                const v = Math.max(
                  1,
                  Math.floor(Number(event.target.value) || 0),
                );

                if (Number.isFinite(v)) {
                  this.setState({ animationDuration: Math.min(5000, v) });
                }
              }}
            />
          </label>

          <div className="inputs__item">
            {' '}
            infinite
            <select
              value={infinite ? 'true' : 'false'}
              onChange={event => {
                this.setState({ infinite: event.target.value === 'true' });
              }}
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>
        </div>

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
