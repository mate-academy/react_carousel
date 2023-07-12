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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'itemWidth':
      case 'frameSize':
      case 'animationDuration':
      case 'step':
        this.setState({ [name]: +value });

        break;

      case 'infinite':
        this.setState(state => ({
          [name]: !state.infinite,
        }));

        break;

      default:
        throw new Error('Value from input is not correct');
    }
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
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
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
            className="App__field"
            htmlFor="itemId"
          >
            Item width:
            <input
              id="itemId"
              className="App__input"
              type="number"
              name="itemWidth"
              onChange={this.handleInputChange}
              value={itemWidth}
            />
          </label>

          <label
            className="App__field"
            htmlFor="frameId"
          >
            Frame size:
            <input
              id="frameId"
              className="App__input"
              type="number"
              name="frameSize"
              min={1}
              max={images.length}
              onChange={this.handleInputChange}
              value={frameSize}
            />
          </label>

          <label className="App__field">
            Animation duration:
            <input
              className="App__input"
              type="number"
              name="animationDuration"
              onChange={this.handleInputChange}
              value={animationDuration}
            />
          </label>

          <label
            className="App__field"
            htmlFor="stepId"
          >
            Step:
            <input
              id="stepId"
              className="App__input"
              type="number"
              name="step"
              min={1}
              max={images.length}
              onChange={this.handleInputChange}
              value={step}
            />
          </label>

          <label className="App__field">
            Infinite:
            <input
              className="App__input"
              type="checkbox"
              name="infinite"
              onChange={this.handleInputChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
