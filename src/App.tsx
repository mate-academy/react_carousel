import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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

  updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${frameSize} images`}
        </h1>
        <div className="Carousel__Form">
          <form>
            <label
              htmlFor="itemId"
            >
              Item Width:
              <input
                type="number"
                id="itemId"
                min="1"
                value={itemWidth}
                name="itemWidth"
                required
                onChange={this.updateInput}
                className="Carousel__Form-input"
              />
            </label>
            <label htmlFor="frameId">
              Frame Size:
              <input
                type="number"
                id="frameId"
                min="1"
                name="frameSize"
                value={frameSize}
                max={images.length}
                required
                onChange={this.updateInput}
                className="Carousel__Form-input"
              />
            </label>
            <label htmlFor="stepId">
              Step:
              <input
                type="number"
                id="stepId"
                min="1"
                name="step"
                value={step}
                max={images.length}
                required
                onChange={this.updateInput}
                className="Carousel__Form-input"
              />
            </label>
            <label htmlFor="animationId">
              Animation Duration
              <input
                type="number"
                id="animationId"
                min="1"
                name="animationDuration"
                value={animationDuration}
                required
                onChange={this.updateInput}
                className="Carousel__Form-input"
              />
            </label>
          </form>
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
