import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './Types/State';

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
    infinite: false,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="controlers">
          <div className="controlers__item">
            <label htmlFor="itemId">Item width: </label>
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              step={10}
              onChange={e => {
                this.setState({ itemWidth: Number(e.target.value) });
              }}
            />
          </div>
          <div className="controlers__item">
            <label htmlFor="frameId">Frame size: </label>
            <input
              id="frameId"
              type="number"
              value={frameSize}
              step={1}
              max={images.length}
              min={1}
              onChange={e => {
                this.setState({ frameSize: Number(e.target.value) });
              }}
            />
          </div>
          <div className="controlers__item">
            <label htmlFor="stepId">Step: </label>
            <input
              id="stepId"
              type="number"
              value={step}
              step={1}
              min={1}
              max={images.length}
              onChange={e => {
                this.setState({ step: Number(e.target.value) });
              }}
            />
          </div>

          <div className="controlers__item">
            <label htmlFor="duration">Animation duration (ms): </label>
            <input
              id="duration"
              type="number"
              value={animationDuration}
              step={100}
              min={1000}
              max={10000}
              onChange={e => {
                this.setState({ animationDuration: Number(e.target.value) });
              }}
            />
          </div>
          <div className="controlers__item controlers__item--checkbox">
            <label htmlFor="infinite">Infinite: </label>
            <input
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={e => {
                this.setState({ infinite: e.target.checked });
              }}
            />
          </div>
        </div>
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
