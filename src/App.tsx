import React from 'react';
import './App.scss';
import 'bulma/css/bulma.css';

import { Carousel } from './components/Carousel';

interface State {
  step: number;
  images: string[];
  itemWidth: number;
  frameSize: number;
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

    step: 3,
    frameSize: 3,
    itemWidth: 130,
    infinite: false,
    animationDuration: 1000,
  };

  render() {
    const { images, step, frameSize, itemWidth, infinite, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="title is-1">
          Carousel with {images.length} images
        </h1>

        <form className="form">
          <div className="field">
            <label htmlFor="itemId" className="label">
              Item Width:
            </label>

            <input
              id="itemId"
              type="number"
              className="input"
              value={itemWidth}
              min={1}
              max={innerWidth / frameSize / 2}
              autoFocus
              onChange={event =>
                this.setState({ itemWidth: +event.target.value })
              }
            />
          </div>

          <div className="field">
            <label htmlFor="frameId" className="label">
              Frame Size:
            </label>

            <input
              id="frameId"
              type="number"
              className="input"
              value={frameSize}
              min={1}
              max={10}
              onChange={event =>
                this.setState({ frameSize: +event.target.value })
              }
            />
          </div>

          <div className="field">
            <label htmlFor="stepId" className="label">
              Step:
            </label>

            <input
              id="stepId"
              type="number"
              className="input"
              value={step}
              min={1}
              max={9}
              onChange={event => this.setState({ step: +event.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="animationId" className="label">
              Animation Duration:
            </label>

            <input
              id="animationId"
              type="number"
              className="input"
              value={animationDuration}
              onChange={event =>
                this.setState({ animationDuration: +event.target.value })
              }
            />
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              className="check"
              onChange={event =>
                this.setState({ infinite: event.target.checked })
              }
            />
            Infinite
          </label>
        </form>

        <Carousel
          step={step}
          images={images}
          infinite={infinite}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
