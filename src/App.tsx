import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number
  step: number
  animationDuration: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleInputChange = (
    event:
    React.ChangeEvent<HTMLInputElement>, key: keyof State,
  ) => {
    const value = key === 'infinite'
      ? event.target.checked
      : Number(event.target.value);

    this.setState((prevState) => ({
      ...prevState,
      [event.target.name]: Number.isNaN(value) ? 0 : value,
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div>
          <label htmlFor="itemWidth">Item Width: </label>
          <input
            name="itemWidth"
            value={itemWidth}
            onChange={(event) => this.handleInputChange(
              event, 'itemWidth',
            )}
          />
        </div>

        <div>
          <label htmlFor="frameSize">Frame Size: </label>
          <input
            name="frameSize"
            value={frameSize}
            onChange={(event) => this.handleInputChange(
              event, 'frameSize',
            )}
          />
        </div>

        <div>
          <label htmlFor="step">Step: </label>
          <input
            name="step"
            value={step}
            onChange={(event) => this.handleInputChange(
              event, 'step',
            )}
          />
        </div>

        <div>
          <label htmlFor="animationDuration">Animation Duration: </label>
          <input
            name="animationDuration"
            value={animationDuration}
            onChange={(event) => this.handleInputChange(
              event, 'animationDuration',
            )}
          />
        </div>
        <div>
          <label htmlFor="infinite">Infinite scroll: </label>
          <input
            type="checkbox"
            name="infinite"
            checked={infinite}
            onChange={(event) => this.handleInputChange(event, 'infinite')}
          />
        </div>

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
