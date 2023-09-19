import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1
          data-cy="title"
          className="App__title"
        >
          Carousel
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="App__inputs-container">
          <label>
            Step:
            <input
              type="number"
              min="1"
              max="10"
              value={step}
              step="1"
              onChange={(e) => this.setState({ step: +e.target.value })}
            />
          </label>

          <label>
            Frame Size:
            <input
              type="number"
              min="1"
              max="4"
              value={frameSize}
              step="1"
              onChange={(e) => this.setState({ frameSize: +e.target.value })}
            />
          </label>

          <label>
            Item Width:
            <input
              type="number"
              min="100"
              max="200"
              value={itemWidth}
              step="10"
              onChange={(e) => this.setState({ itemWidth: +e.target.value })}
            />
          </label>

          <label>
            Animation Duration:
            <input
              type="number"
              min="100"
              max="2000"
              value={animationDuration}
              step="10"
              onChange={(e) => this.setState(
                { animationDuration: +e.target.value },
              )}
            />
          </label>

          <label>
            Infinity:
            <input
              type="checkbox"
              step="10"
              onChange={(e) => this.setState(
                { infinite: e.target.checked },
              )}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
