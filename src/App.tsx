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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  updateState = (name: keyof State, value: number) => {
    this.setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="page__inputs">
          <label htmlFor="itemId">Item width</label>
          <input
            type="number"
            id="itemId"
            min="50"
            max="300"
            value={itemWidth}
            onChange={event =>
              this.updateState('itemWidth', +event.target.value)
            }
          />

          <label htmlFor="frameId">Frame size</label>
          <input
            type="number"
            id="frameId"
            min="1"
            max={images.length}
            value={frameSize}
            onChange={event =>
              this.updateState('frameSize', +event.target.value)
            }
          />

          <label htmlFor="stepId">Step</label>
          <input
            type="number"
            id="stepId"
            min="1"
            max={images.length}
            value={step}
            onChange={event => this.updateState('step', +event.target.value)}
          />

          <label htmlFor="animationDuration">Animation duration</label>
          <input
            type="number"
            id="animationDuration"
            min="0"
            max="5000"
            step="100"
            value={animationDuration}
            onChange={event =>
              this.updateState('animationDuration', +event.target.value)
            }
          />
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={true}
        />
      </div>
    );
  }
}

export default App;
