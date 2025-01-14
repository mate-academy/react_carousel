import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10),
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" >Carousel with {images.length} images</h1>

        <div className="settings">
          <label htmlFor="itemId">
            Item Width:
            <input
              type="number"
              name="itemWidth"
              id="itemId"
              value={itemWidth}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="frameId">
            Frame Size:
            <input
              type="number"
              name="frameSize"
              id="frameId"
              value={frameSize}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="stepId">
            Step:
            <input
              type="number"
              name="step"
              id="stepId"
              value={step}
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            Animation Duration:
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
