import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

import { Image } from './types/Image';
import { IMAGES_DATA } from './data/images';

interface State {
  images: Image[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    images: IMAGES_DATA,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__controls">
          <label className="App__label" htmlFor="animation-duration">
            animation duration
          </label>

          <input
            className="App__input"
            id="animation-duration"
            type="number"
            onChange={e =>
              this.setState({ animationDuration: Number(e.target.value) })
            }
          />

          <label className="App__label" htmlFor="itemId">
            item width
          </label>

          <input
            className="App__input"
            id="itemId"
            type="number"
            onChange={e => this.setState({ itemWidth: Number(e.target.value) })}
          />

          <label className="App__label" htmlFor="frameId">
            frame size
          </label>

          <input
            className="App__input"
            id="frameId"
            type="number"
            onChange={e => this.setState({ frameSize: Number(e.target.value) })}
          />

          <label className="App__label" htmlFor="stepId">
            step
          </label>

          <input
            className="App__input"
            id="stepId"
            type="number"
            onChange={e => this.setState({ step: Number(e.target.value) })}
          />
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
