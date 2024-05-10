import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import './App.scss';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number,
  animationDuration: number,
  infinite: boolean
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
    infinite: false
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } = this.state;

    const alterItemWidth = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ itemWidth: +e.target.value });

    const alterFrameSize = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ frameSize: +e.target.value });

    const alterStep = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ step: +e.target.value });

    const alterAnimationDuration = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ animationDuration: +e.target.value });

    const alterInfinite = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ infinite: e.target.checked });

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel 
          images={this.state.images}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          step={this.state.step}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />

        <div className="App__form">
          <label className="App__lable" htmlFor="itemId">
            Item width:
            <input
              className="App__input"
              id="itemId"
              type="number"
              value={itemWidth}
              min={0}
              step={10}
              onChange={alterItemWidth}
            />
          </label>

          <label className="App__lable" htmlFor="frameId">
            Frame size:
            <input
              className="App__input"
              id="frameId"
              type="number"
              value={frameSize}
              min={1}
              max={images.length}
              onChange={alterFrameSize}
            />
          </label>

          <label className="App__lable" htmlFor="stepId">
            Step:
            <input
              className="App__input"
              id="stepId"
              type="number"
              value={step}
              min={1}
              onChange={alterStep}
            />
          </label>

          <label className="App__lable" htmlFor="animationDurationId">
            Animation duration:
            <input
              className="App__input"
              id="animationDurationId"
              type="number"
              value={animationDuration}
              step={100}
              onChange={alterAnimationDuration}
            />
          </label>
          <label className="App__lable" htmlFor="infiniteId">
            Infinite:
            <input
              className="App__input"
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={alterInfinite}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
