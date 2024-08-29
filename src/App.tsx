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

  changeNumberValue = (
    key: keyof Omit<State, 'images' | 'infinite'>,
    newValue: number,
  ) => {
    if (!Number.isNaN(newValue) && newValue > 0) {
      this.setState({ ...this.state, [key]: newValue });
    }
  };

  changeInfinite = (newInfinite: boolean) => {
    this.setState({ infinite: newInfinite });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="App__form">
          <label htmlFor="stepId" className="App__label">
            Step:{' '}
            <input
              type="number"
              id="stepId"
              min={1}
              max={images.length}
              value={step}
              onChange={event => {
                this.changeNumberValue('step', +event.target.value);
              }}
            />
          </label>

          <label htmlFor="frameId" className="App__label">
            Frame Size:
            <input
              type="number"
              id="frameId"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={event => {
                if (+event.target.value <= images.length) {
                  this.changeNumberValue('frameSize', +event.target.value);
                }
              }}
            />{' '}
          </label>

          <label htmlFor="itemId" className="App__label">
            Item Width:
            <input
              type="number"
              id="itemId"
              min={1}
              value={itemWidth}
              onChange={event => {
                this.changeNumberValue('itemWidth', +event.target.value);
              }}
            />
          </label>

          <label htmlFor="animationDuration" className="App__label">
            Animation Duration:
            <input
              type="number"
              id="animationDuration"
              min={1}
              value={animationDuration}
              onChange={event => {
                this.changeNumberValue(
                  'animationDuration',
                  +event.target.value,
                );
              }}
            />
          </label>

          <label htmlFor="infinite" className="App__label">
            Infinite:
            <input
              type="checkbox"
              id="infinite"
              checked={infinite}
              onChange={event => {
                this.changeInfinite(event.target.checked);
              }}
            />
          </label>
        </form>

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
