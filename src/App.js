import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';

class App extends React.Component {
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
    infinite: false,
  };

  changeSetting = (target, setting) => {
    let value = +target.value;
    const newSetting = {};

    if (setting === 'infinite') {
      value = target.checked;
    }

    newSetting[setting] = value;

    this.setState(newSetting);
  }

  render() {
    const { images }
    = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          infinite={this.state.infinite}
          animationDuration={this.state.animationDuration}
          step={this.state.step}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
        />
        <form className="form">
          <label className="form__inputs">
            step:
            <label>{` 3`}</label>
            <input
              type="range"
              defaultValue="3"
              min="1"
              max="5"
              onInput={({ target }) => {
                const output = target.previousSibling;

                output.textContent = ` ${target.value}`;

                this.changeSetting(target, 'step');
              }}
            />
          </label>
          <label className="form__inputs">
            frameSize:
            <label>{` 3`}</label>
            <input
              type="range"
              defaultValue="3"
              min="1"
              max="5"
              onInput={({ target }) => {
                const output = target.previousSibling;

                output.textContent = ` ${target.value}`;

                this.changeSetting(target, 'frameSize');
              }}
            />
          </label>
          <label className="form__inputs">
            itemWidth:
            <label>{` 130`}</label>
            <input
              type="range"
              defaultValue="130"
              min="100"
              max="259"
              onInput={({ target }) => {
                const output = target.previousSibling;

                output.textContent = ` ${target.value}`;

                this.changeSetting(target, 'itemWidth');
              }}
            />
          </label>
          <label className="form__inputs">
            animationDuration:
            <input
              type="number"
              defaultValue="1000"
              onInput={({ target }) => {
                this.changeSetting(target, 'animationDuration');
              }}
            />
          </label>
          <label className="form__inputs">
            infinite:
            <input
              type="checkbox"
              onInput={({ target }) => {
                this.changeSetting(target, 'infinite');
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
