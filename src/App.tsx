import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
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
    infinite: false,
  };

  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name, checked } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: name === 'infinite' ? checked : +value,
    }));
  };

  render() {
    const {
      images, itemWidth, frameSize, step, animationDuration, infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="settings">
          <h2 className="setting__title">Settings</h2>

          <div className="settings__wrapper">
            <label htmlFor="itemWidth" className="settings__label">
              Item width:
            </label>
            <input
              type="number"
              className="settings__input"
              name="itemWidth"
              step={10}
              value={itemWidth}
              min={10}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="settings__wrapper">
            <label htmlFor="frameSize" className="settings__label">
              Frame size:
            </label>
            <input
              type="number"
              className="settings__input"
              name="frameSize"
              value={frameSize}
              min={1}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="settings__wrapper">
            <label htmlFor="step" className="settings__label">
              Step:
            </label>
            <input
              type="number"
              className="settings__input"
              name="step"
              value={step}
              min={1}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="settings__wrapper">
            <label htmlFor="animationDuration" className="settings__label">
              Animation duration:
            </label>
            <input
              type="number"
              className="settings__input"
              name="animationDuration"
              value={animationDuration}
              min={10}
              step={0}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="settings__wrapper">
            <label htmlFor="animationDuration" className="settings__label">
              Infinite:
            </label>
            <input
              type="checkbox"
              className="settings__input"
              name="infinite"
              checked={infinite}
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          nav={frameSize === step}
        />
      </div>
    );
  }
}

export default App;
