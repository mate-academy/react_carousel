import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './types';

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

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((prevFormData) => ({ ...prevFormData, [name]: +value }));
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
        <h1  data-cy="title">Carousel</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
        <div className="form">
          <div className="form__field">
            <label htmlFor="itemId">
              Customize image width:
            </label>
            <input
              className="form__input"
              type="number"
              name="itemWidth"
              id="itemId"
              value={this.state.itemWidth}
              onChange={this.handleChange}
              placeholder="Image width"
            />
          </div>
          <div className="form__field">
            <label htmlFor="frameId">
              Number of images:
            </label>
            <input
              className="form__input"
              name="frameSize"
              id="frameId"
              value={this.state.frameSize}
              onChange={this.handleChange}
              placeholder="Frame size"
              type="number"
            />
          </div>
          <div className="form__field">
            <label htmlFor="stepId">
              Step images scrolled per click:
            </label>
            <input
              className="form__input"
              type="number"
              name="step"
              id="stepId"
              value={this.state.step}
              onChange={this.handleChange}
              placeholder="Step"
            />
          </div>
          <div className="form__field">
            <label htmlFor="animationId">
              Animation duration:
            </label>
            <input
              className="form__input"
              type="number"
              name="animationDuration"
              id="animationId"
              value={this.state.animationDuration}
              onChange={this.handleChange}
              placeholder="Animation duration"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
