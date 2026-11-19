import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    animationDuration: 1000,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="inputs">
          <div className="inputs__container">
            <label htmlFor="stepId">Step</label>
            <input
              type="number"
              id="stepId"
              onChange={e => this.setState({ step: +e.target.value })}
            />
          </div>

          <div className="inputs__container">
            <label htmlFor="frameId">Frame Size</label>
            <input
              type="number"
              id="frameId"
              onChange={e => this.setState({ frameSize: +e.target.value })}
            />
          </div>

          <div className="inputs__container">
            <label htmlFor="itemId">Item Width</label>
            <input
              type="number"
              id="itemId"
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            />
          </div>

          <div className="inputs__container">
            <label htmlFor="animationDuration">Animation Duration</label>
            <input
              type="number"
              id="animationDuration"
              onChange={e =>
                this.setState({ animationDuration: +e.target.value })
              }
            />
          </div>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
