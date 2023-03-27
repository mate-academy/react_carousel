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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, type, checked,
    } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
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
      <div className="App">
        <h1 className="App__title" data-cy="title">
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="App__form">
          <label
            htmlFor="itemId"
            className="App__label"
          >
            Item width

            <input
              className="App__input"
              id="itemId"
              type="number"
              name="itemWidth"
              value={this.state.itemWidth}
              onChange={this.handleChange}
            />
          </label>

          <label
            htmlFor="frameId"
            className="App__label"
          >
            Frame size

            <input
              className="App__input"
              id="frameId"
              type="number"
              name="frameSize"
              min={1}
              max={10}
              value={this.state.frameSize}
              onChange={this.handleChange}
            />
          </label>

          <label
            htmlFor="stepId"
            className="App__label"
          >
            Step

            <input
              className="App__input"
              id="stepId"
              type="number"
              min={1}
              name="step"
              value={this.state.step}
              onChange={this.handleChange}
            />
          </label>

          <label
            htmlFor="animationId"
            title="name"
            className="App__label"
          >
            Animation duration

            <input
              className="App__input"
              id="animationId"
              type="number"
              name="animationDuration"
              value={this.state.animationDuration}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="infinite">

            Infinite

            <input
              id="infinite"
              type="checkbox"
              name="infinite"
              checked={this.state.infinite}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
