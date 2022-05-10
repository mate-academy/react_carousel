import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type Settings = {
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  images: string[];
  settings: Settings;
};

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
    settings: {
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
      infinite: false,
    },
  };

  updateSettings
  <T extends keyof Settings>(parameter: T, newValue: Settings[T]) {
    this.setState(({ settings }) => ({
      settings: {
        ...settings,
        [parameter]: newValue,
      },
    }));
  }

  render() {
    const { images } = this.state;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state.settings;

    return (
      <div className="app">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          // infinite={infinite}
        />

        <fieldset className="app__settings">
          <label className="app__setting">
            Step:
            <input
              className="app__step"
              type="number"
              min="1"
              max={images.length}
              defaultValue={step}
              onChange={
                (({ target }) => this
                  .updateSettings('step', Number(target.value)))
              }
            />
          </label>

          <label className="app__setting">
            Frame size:
            <input
              className="app__frame-size"
              type="number"
              min="1"
              max={images.length}
              defaultValue={frameSize}
              onChange={
                (({ target }) => this
                  .updateSettings('frameSize', Number(target.value)))
              }
            />
          </label>

          <label className="app__setting">
            Item width:
            <input
              className="app__item-width"
              type="number"
              min="80"
              max="180"
              step="10"
              defaultValue={itemWidth}
              onChange={
                (({ target }) => this
                  .updateSettings('itemWidth', Number(target.value)))
              }
            />
          </label>

          <label className="app__setting">
            Anitmation duration:
            <input
              className="app__animation-duration"
              type="number"
              min="0"
              max="2000"
              step="500"
              defaultValue={animationDuration}
              onChange={
                (({ target }) => this
                  .updateSettings('animationDuration', Number(target.value)))
              }
            />
          </label>

          <label className="app__setting">
            Infinite:
            <input
              className="app__infinite"
              type="checkbox"
              defaultChecked={infinite}
              onChange={
                (({ target }) => this
                  .updateSettings('infinite', target.checked))
              }
            />
          </label>
        </fieldset>
      </div>
    );
  }
}

export default App;
