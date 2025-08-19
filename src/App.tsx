import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  animationDuration: number;
  itemWidth: number;
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
    animationDuration: 1000,
    itemWidth: 130,
    infinite: true,
  };

  changeStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(e.target.value) });
  };

  changeFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: Number(e.target.value) });
  };

  changeAnimationDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: Number(e.target.value) });
  };

  changeItemWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: Number(e.target.value) });
  };

  changeInfinite = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ infinite: e.target.value === 'true' });
  };

  render() {
    const { images, step, frameSize, animationDuration, itemWidth, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <label htmlFor="stepId">
          Step:
          <input
            onChange={this.changeStep}
            id="stepId"
            type="number"
            name="step"
            value={step}
          />
        </label>

        <label htmlFor="frameId">
          FrameSize:
          <input
            onChange={this.changeFrameSize}
            id="frameId"
            type="number"
            name="frameSize"
            value={frameSize}
          />
        </label>

        <label htmlFor="durationId">
          Animation Duration:
          <input
            onChange={this.changeAnimationDuration}
            id="durationId"
            type="number"
            name="animationDuration"
            value={animationDuration}
          />
        </label>

        <label htmlFor="itemId">
          Picture Width:
          <input
            onChange={this.changeItemWidth}
            id="itemId"
            type="number"
            name="itemWidth"
            value={itemWidth}
          />
        </label>

        <label htmlFor="infinite">
          Infinite carousel:
          <select
            onChange={this.changeInfinite}
            name="infinite"
            id="infinite"
            value={ infinite ? 'true' : 'false'}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>

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
