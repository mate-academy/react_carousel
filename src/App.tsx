import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="settings">
          <label className="settings__label">
            Item Width

            <input
              className="settings__input"
              type="number"
              min="10"
              step="10"
              defaultValue={itemWidth}
              onChange={(event) => (
                this.setState({ itemWidth: +event.target.value })
              )}
            />
          </label>

          <label className="settings__label">
            Frame Size

            <input
              className="settings__input"
              type="number"
              min="1"
              max="10"
              defaultValue={frameSize}
              onChange={(event) => (
                this.setState({ frameSize: +event.target.value })
              )}
            />
          </label>

          <label className="settings__label">
            Step

            <input
              className="settings__input"
              type="number"
              min="1"
              max="10"
              defaultValue={step}
              onChange={(event) => (
                this.setState({ step: +event.target.value })
              )}
            />
          </label>

          <label className="settings__label">
            Animation duration

            <input
              className="settings__input"
              type="number"
              min="100"
              step="200"
              max="10000"
              defaultValue={animationDuration}
              onChange={(event) => (
                this.setState({ animationDuration: +event.target.value })
              )}
            />
          </label>
        </div>

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
