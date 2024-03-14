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

        <div className="App__container">
          <label htmlFor="step" className="App__label">
            Step:
            <input
              className="App__input"
              id="step"
              type="number"
              value={step}
              onChange={e => this.setState({ step: Number(e.target.value) })}
            />
          </label>
          <label htmlFor="frame" className="App__label">
            Frame size:
            <input
              className="App__input"
              id="frame"
              type="number"
              value={frameSize}
              onChange={e =>
                this.setState({ frameSize: Number(e.target.value) })
              }
            />
          </label>

          <label htmlFor="item" className="App__label">
            Item width:
            <input
              className="App__input"
              id="item"
              type="number"
              value={itemWidth}
              onChange={e =>
                this.setState({ itemWidth: Number(e.target.value) })
              }
            />
          </label>
          <label htmlFor="fnimationDuration" className="App__label">
            Animation duration:
            <input
              className="App__input"
              id="fnimationDuration"
              type="number"
              value={animationDuration}
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

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
