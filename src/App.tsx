import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
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
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputField: string) => {
    const { value } = event.target;
    
    this.setState(prevState => ({
      ...prevState,
      [inputField]: +value,
    }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {this.state.images.length} images</h1>
        <div className="inputs">
          <label htmlFor="itemId">Item width:</label>
          <input
            id="itemId"
            type="number"
            min="130"
            max="300"
            step="10"
            value={itemWidth}
            onChange={(event) => this.handleInputChange(event, "itemWidth")}
          />
          <label htmlFor="frameId">Frame size:</label>
          <input
            id="frameId"
            type="number"
            min="3"
            max="10"
            value={frameSize}
            onChange={(event) => this.handleInputChange(event, "frameSize")}
          />
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            min="1"
            max="10"
            value={step}
            onChange={(event) => this.handleInputChange(event, "step")}
          />
          <label htmlFor="animationDuration">Animation duration:</label>
          <input
            id="animationDuration"
            type="number"
            min="1000"
            max="10000"
            value={animationDuration}
            onChange={(event) => this.handleInputChange(event, "animationDuration")}
          />
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
