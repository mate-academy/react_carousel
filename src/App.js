import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';

const imagesFromServer = [
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

class App extends React.Component {
  state = {
    images: imagesFromServer,
    steep: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  changeInputSeting(target, typeSetting) {
    const output = target.previousElementSibling;
    const newState = {};

    newState[typeSetting] = +target.value;

    output.value = target.value;
    output.style = 'color: rgb(112, 0, 93); font-size: 22px;';
    this.setState(newState);
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1>
          Carousel with
          {`: ${images.length} `}
          images
        </h1>

        <form className="form">
          <label className="form__inputs">
            steep
            <output className="form__outputs" id="steep">3</output>
            <input
              type="range"
              defaultValue="3"
              min="1"
              max="5"
              onInput={({ target }) => (
                this.changeInputSeting(target, 'steep')
              )}
            />
          </label>

          <label className="form__inputs">
            frameSize
            <output className="form__outputs" id="frameSize">3</output>
            <input
              type="range"
              defaultValue="3"
              min="1"
              max="5"
              onInput={({ target }) => (
                this.changeInputSeting(target, 'frameSize')
              )}
            />
          </label>

          <label className="form__inputs">
            itemWidth
            <output className="form__outputs" id="itemWidth">130</output>
            <input
              type="range"
              defaultValue="130"
              min="100"
              max="280"
              step="10"
              onInput={({ target }) => {
                this.changeInputSeting(target, 'itemWidth');
              }}
            />
          </label>

          <p>
            <label className="form__inputs">
              animationDuration
              <output
                className="form__outputs"
                id="animationDuration"
              >
                1000
              </output>
              ms
              <input
                type="range"
                defaultValue="130"
                min="500"
                max="3500"
                step="500"
                onInput={({ target }) => (
                  this.changeInputSeting(target, 'animationDuration')
                )}
              />
            </label>

            <label className="form__inputs">
              infinite
              <input
                type="checkbox"
                id="infinite"
                onChange={({ target }) => (
                  this.setState({
                    infinite: target.checked,
                  })
                )}
              />
            </label>
          </p>

        </form>

        <Carousel
          {...this.state}
        />
      </div>
    );
  }
}

export default App;
