import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number
  step: number
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

  handleInputChange = (
    event: string, key: keyof State,
  ) => {
    const value = Number(event);

    this.setState((prevState) => ({
      ...prevState,
      [key]: Number.isNaN(value) ? 0 : value,
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <input
          type="text"
          value={itemWidth}
          onChange={(event) => this.handleInputChange(
            event.target.value, 'itemWidth',
          )}
        />
        <input
          type="text"
          value={frameSize}
          onChange={(event) => this.handleInputChange(
            event.target.value, 'frameSize',
          )}
        />
        <input
          type="text"
          value={step}
          onChange={(event) => this.handleInputChange(
            event.target.value, 'step',
          )}
        />
        <input
          type="text"
          value={animationDuration}
          onChange={(event) => this.handleInputChange(
            event.target.value, 'animationDuration',
          )}
        />

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
