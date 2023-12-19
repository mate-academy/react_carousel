import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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

  setWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  setInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <div className="App__labels">
          <label
            htmlFor="itemId"
            className="App__label"
          >
            Item Width:
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              min={130}
              max={260}
              step={10}
              onChange={this.setWidth}
            />
          </label>

          <label
            htmlFor="stepId"
            className="App__label"
          >
            Step:
            <input
              id="stepId"
              type="number"
              value={step}
              min={1}
              max={10}
              step={1}
              onChange={this.setStep}
            />
          </label>

          <label
            htmlFor="frameId"
            className="App__label"
          >
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize}
              min={1}
              max={10}
              step={1}
              onChange={this.setFrameSize}
            />
          </label>

          <label
            htmlFor="durationId"
            className="App__label"
          >
            Animation Duration:
            <input
              id="durationId"
              type="number"
              value={animationDuration}
              min={0}
              max={50000}
              step={500}
              onChange={this.setAnimationDuration}
            />
          </label>

          <label
            className="App__label"
            htmlFor="infinite"
          >
            Infinite:
            <input
              id="infinite"
              type="checkbox"
              name="infinite"
              onChange={(event) => {
                this.setState({
                  infinite: event.target.checked,
                });
              }}
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
