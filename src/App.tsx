import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
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
    step: 3,
    frameSize: 3,
    animationDuration: 1000,
    infinite: false,
  };

  updateState = (name: keyof State, value: number | boolean) => {
    this.setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.updateState(event.target.name as keyof State, +event.target.value);
  };

  handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const { images, itemWidth, frameSize, animationDuration, step, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__inputs">
          <label htmlFor="itemId">Item width</label>
          <input
            name={'itemWidth' as keyof State}
            type="number"
            min="50"
            max="300"
            id="itemId"
            value={itemWidth}
            onChange={this.handleInput}
          />

          <label htmlFor="frameId">Frame size</label>
          <input
            name={'frameSize' as keyof State}
            type="number"
            id="frameId"
            min="1"
            max={images.length}
            value={frameSize}
            onChange={this.handleInput}
          />

          <label htmlFor="stepId">Scroll by step</label>
          <input
            type="number"
            name="step"
            id="stepId"
            min="1"
            max={images.length}
            value={step}
            onChange={this.handleInput}
          />

          <label htmlFor="animationDuration">Animation duration</label>
          <input
            name={'animationDuration' as keyof State}
            type="number"
            id="animationDuration"
            min="0"
            max="5000"
            step="100"
            value={animationDuration}
            onChange={this.handleInput}
          />

          <label htmlFor="infiniteScroll">
            Infinite scroll
            <input
              name={'infinite' as keyof State}
              type="checkbox"
              id="infiniteScroll"
              checked={infinite}
              onChange={this.handleCheckBox}
            />
          </label>
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
