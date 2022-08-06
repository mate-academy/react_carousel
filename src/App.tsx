import React from 'react';
import { v4 as uuid } from 'uuid';
import './App.scss';
import Carousel from './components/Carousel';
import { Image } from './types/Image';

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

interface State {
  images: Image[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    images: imagesFromServer.map(img => (
      {
        image: img,
        id: uuid(),
      }
    )),
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
      animationDuration,
      step,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label>
          Item Width:
          <input
            type="number"
            value={itemWidth}
            min="130"
            max="250"
            step="5"
            onChange={({ target }) => (
              this.setState({ itemWidth: +target.value })
            )}
          />
        </label>

        <label>
          Frame Size:
          <input
            type="number"
            value={frameSize}
            min="1"
            max="10"
            onChange={({ target }) => (
              this.setState({ frameSize: +target.value })
            )}
          />
        </label>

        <label>
          Step:
          <input
            type="number"
            value={step}
            min="1"
            max="5"
            onChange={({ target }) => (
              this.setState({ step: +target.value })
            )}
          />
        </label>

        <label>
          Animation Duration:
          <input
            type="number"
            value={animationDuration}
            min="100"
            max="2000"
            step="100"
            onChange={({ target }) => (
              this.setState({ animationDuration: +target.value })
            )}
          />
        </label>

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
