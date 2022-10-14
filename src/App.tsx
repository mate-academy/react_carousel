import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

export class App extends React.Component<{}, State> {
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
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form className="App__form">
          <label>
            <span>Item width:</span>
            <input
              type="number"
              className="App__input"
              value={itemWidth}
              onChange={(event) => (
                this.setState({ itemWidth: +event.target.value })
              )}
            />
          </label>

          <label>
            <span>Frame size:</span>
            <input
              type="number"
              className="App__input"
              min="1"
              max={1300 / itemWidth}
              value={frameSize}
              onChange={(event) => (
                this.setState({ frameSize: +event.target.value })
              )}
            />
          </label>

          <label>
            <span>Step:</span>
            <input
              type="number"
              className="App__input"
              value={step}
              min="1"
              max={frameSize}
              onChange={(event) => (
                this.setState({ step: +event.target.value })
              )}
            />
          </label>

          <label>
            <span>Animation duration:</span>
            <input
              type="number"
              className="App__input"
              value={animationDuration}
              min="100"
              max="3000"
              step="100"
              onChange={(event) => (
                this.setState({ animationDuration: +event.target.value })
              )}
            />
          </label>

          <label>
            <span>Infinite:</span>
            <input
              type="checkbox"
              className="App__input"
              checked={infinite}
              onChange={() => (
                this.setState((state) => ({
                  infinite: !state.infinite,
                }))
              )}
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
