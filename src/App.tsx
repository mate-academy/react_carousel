import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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

    const handleItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ itemWidth: +event.target.value });
    };

    const handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ frameSize: +event.target.value });
    };

    const handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ step: +event.target.value });
    };

    const handleDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ animationDuration: +event.target.value });
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="App__container">
          <label htmlFor="itemId">
            Item Width:
            <input
              className="App__input"
              id="itemId"
              type="number"
              min={50}
              max={390}
              step={10}
              onChange={handleItemWidth}
              value={itemWidth}
            />
          </label>

          <label htmlFor="frameId">
            Frame Size:
            <input
              className="App__input"
              id="frameId"
              type="number"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={handleFrameSize}
            />
          </label>

          <label htmlFor="stepId">
            Step:
            <input
              className="App__input"
              id="stepId"
              type="number"
              min={1}
              max={10}
              value={step}
              onChange={handleStep}
            />
          </label>

          <label htmlFor="animationDurationId">
            Animation Duration:
            <input
              className="App__input"
              id="animationDurationId"
              type="number"
              min={100}
              step={100}
              value={animationDuration}
              onChange={handleDuration}
            />
          </label>
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
