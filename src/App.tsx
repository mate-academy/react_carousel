import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: number;
  infinite: boolean;
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
    frameSize: 3,
    step: 3,
    itemWidth: 130,
    infinite: false,
    animationDuration: 1000,
  };

  handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name as keyof State]: +value,
    }));
  };

  handleChangeBoolean = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name as keyof State]: !prevState[name as keyof State],
    }));
  };

  render() {
    const { images, frameSize, step, itemWidth, infinite, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <fieldset className="App__settings">
          <legend>Settings</legend>
          <label className="App__settings-label" htmlFor="itemId">
            Items width:
            <input
              id="itemId"
              className="App__settings-input"
              type="number"
              name="itemWidth"
              value={itemWidth}
              min="130"
              max="260"
              step="10"
              onChange={this.handleChangeNumber}
            />
          </label>

          <label className="App__settings-label" htmlFor="frameId">
            Frame size:
            <input
              id="frameId"
              className="App__settings-input"
              type="number"
              name="frameSize"
              min="1"
              max={images.length}
              value={frameSize}
              onChange={this.handleChangeNumber}
            />
          </label>

          <label className="App__settings-label" htmlFor="stepId">
            Step:
            <input
              id="stepId"
              className="App__settings-input"
              type="number"
              name="step"
              min="1"
              max={images.length}
              value={step}
              onChange={this.handleChangeNumber}
            />
          </label>

          <label className="App__settings-label" htmlFor="animationDuration">
            Duration:
            <input
              id="animationDuration"
              className="App__settings-input"
              type="number"
              name="animationDuration"
              min="0"
              step={100}
              value={animationDuration}
              onChange={this.handleChangeNumber}
            />
          </label>

          <label className="App__settings-label" htmlFor="infinite">
            Infinite ?
            <input
              id="infinite"
              className="App__settings-input App__settings-input--checkbox"
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleChangeBoolean}
            />
          </label>
        </fieldset>

        <Carousel
          images={images}
          frameSize={frameSize}
          step={step}
          itemWidth={itemWidth}
          infinite={infinite}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
