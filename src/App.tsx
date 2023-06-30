import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  options: {
    animationDuration: number,
    itemWidth: number,
    step: number,
    frameSize: number,
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
      animationDuration: 1000,
      itemWidth: 130,
      step: 3,
      frameSize: 3,
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
      animationDuration,
      frameSize,
      step,
      itemWidth,
    } = options;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title' className='App__title'>Carousel with {images.length} images</h1>
        <form className="App__form">
          <div className="App__field">
            <label htmlFor="animationDuration">Animation duration (ms)</label>
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              value={animationDuration}
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>

          <div className="App__field">
            <label htmlFor="itemId">Slide width (px)</label>
            <input
              type="number"
              name="itemWidth"
              id="itemId"
              value={itemWidth}
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>

          <div className="App__field">
            <label htmlFor="stepId">Scroll step</label>
            <input
              type="number"
              name="step"
              id="stepId"
              value={step}
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>

          <div className="App__field">
            <label htmlFor="frameId">Images per slide</label>
            <input
              type="number"
              name="frameSize"
              id="frameId"
              value={frameSize}
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>
        </form>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
