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

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const stateValue = (name === 'infinite')
      ? event.currentTarget.checked
      : +value;

    this.setState(previousState => ({
      ...previousState,
      [name]: stateValue,
    }));
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
      <div className="app">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <form
          className="app__form"
        >
          <label className="app__label">
            Frame size:
            <input
              className="app__input"
              min={1}
              max={10}
              name="frameSize"
              type="number"
              defaultValue={frameSize}
              onChange={this.handleChange}
            />
          </label>

          <label className="app__label">
            Step:
            <input
              className="app__input"
              min={1}
              max={5}
              name="step"
              type="number"
              defaultValue={step}
              onChange={this.handleChange}
            />
          </label>

          <label className="app__label">
            Item width:
            <input
              className="app__input"
              min={50}
              max={400}
              name="itemWidth"
              type="number"
              defaultValue={itemWidth}
              onChange={this.handleChange}
            />
          </label>

          <label className="app__label">
            Animation:
            <input
              className="app__input"
              min={100}
              max={10000}
              name="animationDuration"
              type="number"
              defaultValue={animationDuration}
              onChange={this.handleChange}
            />
          </label>

          <label className="app__label">
            Infinite:
            <input
              name="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.handleChange}
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
