import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleChangeItemWidth = (e: ChangeEvent) => {
    this.setState({ itemWidth: Number((e.target as HTMLInputElement).value) });
  };

  handleChangeFrameSize = (e: ChangeEvent) => {
    this.setState({ frameSize: Number((e.target as HTMLInputElement).value) });
  };

  handleChangeStep = (e: ChangeEvent) => {
    this.setState({ step: Number((e.target as HTMLInputElement).value) });
  };

  handleChangeAnimationDuration = (e: ChangeEvent) => {
    this.setState({
      animationDuration: Number((e.target as HTMLInputElement).value),
    });
  };

  handleChangeInfinite = (e: ChangeEvent) => {
    this.setState({ infinite: (e.target as HTMLInputElement).checked });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="inputs__wrapper">
          <label htmlFor="itemId">Item width:</label>
          <input
            min={100}
            id="itemId"
            name="itemWidth"
            type="number"
            value={itemWidth}
            onChange={this.handleChangeItemWidth}
          />
          <label htmlFor="frameId">Frame size:</label>
          <input
            min={1}
            max={images.length}
            id="frameId"
            name="frameSize"
            type="number"
            value={frameSize}
            onChange={this.handleChangeFrameSize}
          />
          <label htmlFor="stepId">Step:</label>
          <input
            min={1}
            max={images.length}
            id="stepId"
            name="step"
            type="number"
            value={step}
            onChange={this.handleChangeStep}
          />
          <label htmlFor="animationId">Animation duration:</label>
          <input
            id="animationId"
            name="animationDuration"
            type="number"
            value={animationDuration}
            onChange={this.handleChangeAnimationDuration}
          />
          <label htmlFor="infiniteId">infinite</label>
          <input
            type="checkbox"
            name="infinite"
            id="infiniteId"
            checked={infinite}
            onChange={this.handleChangeInfinite}
          />
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
