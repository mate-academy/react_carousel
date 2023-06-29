import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  options: {
    duration: number,
    width: number,
    step: number,
    size: number,
  }
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
    options: {
      duration: 1000,
      width: 130,
      step: 3,
      size: 3,
    },
  };

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState((prev) => {
      return {
        ...prev,
        options: {
          ...prev.options,
          [event.target.name]: event.target.value,
        },
      };
    });
  }

  render() {
    const { images, options } = this.state;
    const {
      duration,
      size,
      step,
      width,
    } = options;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title' className='App__title'>Carousel with {images.length} images</h1>
        <form className="App__form">
          <label htmlFor="duration">Animation duration (ms)</label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={options.duration}
            onChange={(e) => this.handleInputChange(e)}
          />
          <label htmlFor="width">Slide width (px)</label>
          <input
            type="number"
            name="width"
            id="width"
            value={options.width}
            onChange={(e) => this.handleInputChange(e)}
          />
          <label htmlFor="step">Scroll step</label>
          <input
            type="number"
            name="step"
            id="step"
            value={options.step}
            onChange={(e) => this.handleInputChange(e)}
          />
          <label htmlFor="size">Images per slide</label>
          <input
            type="number"
            name="size"
            id="size"
            value={options.size}
            onChange={(e) => this.handleInputChange(e)}
          />
        </form>
        <Carousel
          images={images}
          frameSize={size}
          itemWidth={width}
          step={step}
          animationDuration={duration}
        />
      </div>
    );
  }
}

export default App;
