import React from 'react';
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

  changeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: +event.target.value,
    });
  };

  changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: +event.target.value,
    });
  };

  changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      step: +event.target.value,
    });
  };

  changeAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animationDuration: +event.target.value,
    });
  };

  changeInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      infinite: event.target.checked,
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="App__title" >Carousel with {images.length} images</h1>

        <div className="App__options">
          <label htmlFor="itemWidth" className="App__options--label">
            Item Width:
            <input
              className="App__options--input"
              id="itemWidth"
              type="number"
              value={itemWidth}
              min={130}
              max={390}
              onChange={this.changeItemWidth}
            />
          </label>

          <label htmlFor="frameSize" className="App__options--label">
            Frame Size:
            <input
              className="App__options--input"
              id="frameSize"
              type="number"
              value={frameSize}
              min={1}
              max={5}
              step={1}
              onChange={this.changeFrameSize}
            />
          </label>

          <label htmlFor="step" className="App__options--label">
            Step:
            <input
              className="App__options--input"
              id="step"
              type="number"
              value={step}
              min={1}
              max={5}
              step={1}
              onChange={this.changeStep}
            />
          </label>

          <label htmlFor="animationDuration" className="App__options--label">
            Animation Duration:
            <input
              className="App__options--input"
              id="animationDuration"
              type="number"
              value={animationDuration}
              min={500}
              max={5000}
              step={500}
              onChange={this.changeAnimationDuration}
            />
          </label>

          <label htmlFor="infinite" className="App__options--label">
            Infinite:
            <input
              className="App__options--input"
              id="infinite"
              type="checkbox"
              onChange={this.changeInfinite}
            />
          </label>
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
