import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => (
      {
        ...state,
        [event.target.name]: +event.target.value,
      }));
  };

  checkInfinite = () => {
    this.setState(({ infinite }) => ({ infinite: !infinite }));
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className='App__title'>Carousel with {images.length} images</h1>
        <div className="App__container">
          <label htmlFor="itemId">
            Width of image:
            <input
              type="number"
              name="itemWidth"
              className="App__input-field"
              id="itemId"
              value={itemWidth}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="frameId">
            Number of displayed images:
            <input
              type="number"
              name="frameSize"
              className="App__input-field"
              id="frameId"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="stepId">
            Number of scrolled images:
            <input
              type="number"
              name="step"
              className="App__input-field"
              id="stepId"
              min={1}
              value={step}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="animationId">
            Time in ms to show the new images:
            <input
              type="number"
              name="animationDuration"
              className="App__input-field"
              id="animationId"
              value={animationDuration}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="infinite">
            Infinite:
            <input
              type="checkbox"
              className="App__input-field App__input-field--checkbox"
              id="infinite"
              checked={infinite}
              onChange={this.checkInfinite}
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
