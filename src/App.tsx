import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

import { State } from './types/State';

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
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="App__container">
          <label htmlFor="itemId" className="App__label">
            Item width:
            <input
              className="App__input"
              id="itemId"
              type="number"
              value={itemWidth}
              min={0}
              step={10}
              onChange={e =>
                this.setState({ itemWidth: Number(e.target.value) })
              }
            />
          </label>

          <label htmlFor="frameId" className="App__label">
            Frame size:
            <input
              className="App__input"
              id="frameId"
              type="number"
              value={frameSize}
              min={1}
              max={images.length}
              step={1}
              onChange={e =>
                this.setState({ frameSize: Number(e.target.value) })
              }
            />
          </label>

          <label htmlFor="stepId" className="App__label">
            Step:
            <input
              className="App__input"
              id="stepId"
              type="number"
              value={step}
              min={1}
              max={images.length}
              step={1}
              onChange={e => this.setState({ step: Number(e.target.value) })}
            />
          </label>

          <label htmlFor="animationDuration" className="App__label">
            Animation duration:
            <input
              className="App__input"
              id="animationDuration"
              type="number"
              value={animationDuration}
              step={100}
              onChange={e =>
                this.setState({ animationDuration: Number(e.target.value) })
              }
            />
          </label>
          <label htmlFor="infinite" className="App__label">
            Infinite:
            <input
              className="App__input"
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
