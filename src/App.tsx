import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
}

const images: string[] = [
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

class App extends React.Component<{}, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  render() {
    const {
      itemWidth, frameSize, step, animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="parametr-editor">
          <label htmlFor="itemId">
            Item width:

            <input
              id="widthId"
              type="number"
              value={itemWidth}
              min={130}
              max={1300}
              onChange={ev => {
                this.setState({ itemWidth: +ev.target.value });
              }}
            />
          </label>

          <label htmlFor="frameId">
            Displayed images number

            <input
              id="frameSize"
              type="number"
              value={frameSize}
              min={1}
              max={10}
              onChange={ev => {
                this.setState({ frameSize: +ev.target.value });
              }}
            />
          </label>

          <label htmlFor="stepId">
            Step:

            <input
              id="step"
              type="number"
              value={step}
              min={1}
              max={10}
              onChange={ev => {
                this.setState({ step: +ev.target.value });
              }}
            />
          </label>

          <label htmlFor="itemWidth">
            Animation duration:

            <input
              id="widthId"
              type="number"
              value={animationDuration}
              min={500}
              onChange={ev => {
                this.setState({ animationDuration: +ev.target.value });
              }}
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
