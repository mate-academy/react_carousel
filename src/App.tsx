import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface Settings {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

interface State {
  images: string[];
  settings: Settings;
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
    settings: {
      itemWidth: 130,
      frameSize: 3,
      step: 3,
      animationDuration: 1000,
    },
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState(prev => ({
      settings: {
        ...prev.settings,
        [name]: parseInt(value, 10) || prev.settings[name as keyof Settings],
      },
    }));
  };

  render() {
    const { images, settings } = this.state;
    const { itemWidth, frameSize, step, animationDuration } = settings;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__controls">
          <label htmlFor="itemId">
            itemWidth:
            <input
              id="itemId"
              name="itemWidth"
              type="number"
              value={itemWidth}
              onChange={this.handleChange}
              min="1"
            />
          </label>
          <label htmlFor="frameId">
            frameSize:
            <input
              id="frameId"
              name="frameSize"
              type="number"
              value={frameSize}
              onChange={this.handleChange}
              min="1"
            />
          </label>
          <label htmlFor="stepId">
            step:
            <input
              id="stepId"
              name="step"
              type="number"
              value={step}
              onChange={this.handleChange}
              min="1"
            />
          </label>
          <label htmlFor="animationId">
            animationDuration:
            <input
              id="animationId"
              name="animationDuration"
              type="number"
              value={animationDuration}
              onChange={this.handleChange}
              min="0"
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
