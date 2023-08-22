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

  handleInputChange = (key: keyof State) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(e.target.value);

    this.setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  render() {
    const {
      images, itemWidth, frameSize, step, animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />

        <div className="Control">
          <h2 className="Control__title">Control panel</h2>
          <div className="Control__container">
            <div className="Control__item">
              <label
                htmlFor="itemWidth"
                className="Control__label"
              >
                Item Width:
              </label>
              <input
                type="number"
                id="itemWidth"
                className="Control__input"
                name="itemWidth"
                min="130"
                max="260"
                step="10"
                value={itemWidth}
                onChange={this.handleInputChange('itemWidth')}
              />
            </div>
            <div className="Control__item">
              <label
                htmlFor="frameSize"
                className="Control__label"
              >
                Frame Size:
              </label>
              <input
                type="number"
                id="frameSize"
                className="Control__input"
                name="frameSize"
                min="1"
                max="10"
                step="1"
                value={frameSize}
                onChange={this.handleInputChange('frameSize')}
              />
            </div>
            <div className="Control__item">
              <label
                htmlFor="step"
                className="Control__label"
              >
                Step:
              </label>
              <input
                type="number"
                id="step"
                className="Control__input"
                name="step"
                min="1"
                max="10"
                step="1"
                value={step}
                onChange={this.handleInputChange('step')}
              />
            </div>
            <div className="Control__item">
              <label
                htmlFor="animationDuration"
                className="Control__label"
              >
                Duration:
              </label>
              <input
                type="number"
                id="animationDuration"
                className="Control__input"
                name="animationDuration"
                min="500"
                max="5000"
                step="500"
                value={animationDuration}
                onChange={this.handleInputChange('animationDuration')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
