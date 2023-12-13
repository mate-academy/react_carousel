import React from 'react';

import Carousel from './components/Carousel';
import { AppState } from './types/AppState';

import './App.scss';

const pictures = [
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
];

class App extends React.Component<{}, AppState> {
  state = {
    images: pictures,
    step: 3,
    itemWidth: 130,
    frameSize: 3,
    animationDuration: 1000,
  };

  handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      type,
      checked,
      value,
    } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: type !== 'checkbox' ? +value : checked,
    }));
  };

  render() {
    const {
      animationDuration,
      itemWidth,
      frameSize,
      images,
      step,
    } = this.state;

    return (
      <div className="App">
        <fieldset>
          <legend
            className="title"
            data-cy="title"
          >
            {`Carousel with ${images.length} images`}
          </legend>

          <form className="form" action="/">
            <label htmlFor="itemId" className="label">
              <span>
                Item Width:
              </span>
              <input
                name="itemWidth"
                type="number"
                id="itemId"
                min={130}
                className="form__input"
                value={itemWidth}
                onChange={this.handleWidthChange}
              />
            </label>

            <label htmlFor="frameId" className="label frame-size">
              <span>
                Frame Size:
              </span>
              <input
                name="frameSize"
                type="number"
                id="frameId"
                min={1}
                max={10}
                className="form__input"
                value={frameSize}
                onChange={this.handleWidthChange}
              />
            </label>

            <label htmlFor="stepId" className="label step">
              <span>
                Step:
              </span>
              <input
                name="step"
                type="number"
                id="stepId"
                className="form__input"
                min={1}
                value={step}
                onChange={this.handleWidthChange}
              />
            </label>

            <label htmlFor="animationDuration" className="label">
              <span>
                Animation duration:
              </span>
              <input
                name="animationDuration"
                type="number"
                id="animationDuration"
                min={500}
                step={500}
                className="form__input"
                value={animationDuration}
                onChange={this.handleWidthChange}
              />
            </label>
          </form>
        </fieldset>

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
