import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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
    images: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    step: 3,
    frameSize: 3,
    itemWidth: 130, // px
    animationDuration: 1000, // 1000
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

        <form
          action="/"
          method="post"
          className="values"
        >
          <label className="values__label">
            step:
            <input
              className="values__input"
              type="number"
              name="step"
              min="1"
              max="5"
              step="1"
              value={step}
              onChange={(event) => {
                this.setState({ step: +event.target.value });
              }}
            />
          </label>

          <label className="values__label">
            frameSize:
            <input
              className="values__input"
              type="number"
              name="frameSize"
              min="1"
              max="5"
              step="1"
              value={frameSize}
              onChange={(event) => {
                this.setState({ frameSize: +event.target.value });
              }}
            />
          </label>

          <label className="values__label">
            itemWidth (px):
            <input
              className="values__input"
              type="range"
              name="frameSize"
              min="130"
              max="300"
              step="10"
              value={itemWidth}
              onChange={(event) => {
                this.setState({ itemWidth: +event.target.value });
              }}
            />
          </label>

          <label className="values__label">
            animationDuration (ms):
            <input
              className="values__input"
              name="animationDuration"
              type="number"
              min="1000"
              max="5000"
              step="1000"
              value={animationDuration}
              onChange={(event) => {
                this.setState({ animationDuration: +event.target.value });
              }}
            />
          </label>

          <label className="values__label">
            infinite:
            <select
              name="infinite"
              onChange={(event) => {
                this.setState({ infinite: event.target.value === 'true' });
              }}
            >
              <option value="fasle">fasle</option>
              <option value="true">true</option>
            </select>
          </label>
        </form>

        <Carousel
          imagesNumbers={images}
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
