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
            <input
              type="number"
              defaultValue="3"
              min="1"
              max="5"
              onInput={({ target }) => {
                this.changeSetting(target, 'step');
              }}
            />
          </label>
          <label className="form__inputs">
            frameSize:
            <input
              type="number"
              defaultValue="3"
              min="1"
              max="5"
              onInput={({ target }) => {
                this.changeSetting(target, 'frameSize');
              }}
            />
          </label>
          <label className="form__inputs">
            itemWidth:
            <input
              type="number"
              defaultValue="130"
              min="100"
              max="150"
              onInput={({ target }) => {
                this.changeSetting(target, 'itemWidth');
              }}
            />
          </label>
          <label className="form__inputs">
            animationDuration:
            <input
              type="number"
              defaultValue="1000"
              min="500"
              max="2000"
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
