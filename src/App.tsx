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
    itemWidth: 130, // px
    animationDuration: 1000, // 1000
    infinite: false,
  };

  handlerStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  handlerFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  handlerItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  handlerAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ animationDuration: +event.target.value });
  };

  handlerInfiniteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ infinite: event.target.value === 'true' });
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
              onChange={this.handlerStepChange}
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
              onChange={this.handlerFrameSizeChange}
            />
          </label>

          <label className="values__label">
            itemWidth (px):
            <input
              className="values__input"
              type="range"
              name="itemWidth"
              min="130"
              max="300"
              step="10"
              value={itemWidth}
              onChange={this.handlerItemWidthChange}
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
              step="500"
              value={animationDuration}
              onChange={this.handlerAnimationDurationChange}
            />
          </label>

          <label className="values__label">
            infinite:
            <select
              name="infinite"
              defaultValue="false"
              onChange={this.handlerInfiniteChange}
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
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
