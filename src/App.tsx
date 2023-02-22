import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const images = [
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
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinity: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinity: false,
  };

  render() {
    const {
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        <h1>{`Carousel with ${images.length} images`}</h1>

        <div className="Panel">
          <label className="Panel__label">
            Item Width:

            <input
              className="Panel__input"
              type="number"
              value={itemWidth}
              onChange={(e) => {
                this.setState({ itemWidth: +e.currentTarget.value });
              }}
            />
          </label>

          <label className="Panel__label">
            Frame Size:

            <input
              className="Panel__input"
              type="number"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={(e) => {
                this.setState({ frameSize: +e.currentTarget.value });
              }}
            />
          </label>

          <label className="Panel__label">
            Step:

            <input
              className="Panel__input"
              type="number"
              min={1}
              max={images.length}
              value={step}
              onChange={(e) => {
                this.setState({ step: +e.currentTarget.value });
              }}
            />
          </label>

          <label className="Panel__label">
            Animation duration:

            <input
              className="Panel__input"
              type="number"
              value={animationDuration}
              onChange={(e) => {
                this.setState({ animationDuration: +e.currentTarget.value });
              }}
            />
          </label>

          <label className="Panel__label">
            Infinity:

            <input
              className="Panel__input"
              type="checkbox"
              checked={infinity}
              onChange={() => {
                this.setState({ infinity: !infinity });
              }}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinity={infinity}
        />
      </div>
    );
  }
}

export default App;
