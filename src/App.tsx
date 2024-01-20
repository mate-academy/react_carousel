import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
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
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <label htmlFor="itemId">
          <h3>Write itemWidth</h3>
        </label>

        <input
          type="number"
          name="itemWidth"
          id="itemId"
          placeholder="item width"
          value={itemWidth}
          onChange={(e) => {
            this.setState({ itemWidth: +e.target.value });
          }}
        />

        <label htmlFor="frameId">
          <h3>Write Frame Sise</h3>
        </label>

        <input
          type="number"
          name="frameSize"
          id="frameId"
          placeholder="frame size"
          value={frameSize}
          onChange={(e) => {
            this.setState({ frameSize: +e.target.value });
          }}
        />

        <label htmlFor="stepId">
          <h3>Write step</h3>
        </label>

        <input
          type="number"
          name="step"
          placeholder="step"
          id="stepId"
          value={step}
          onChange={(e) => {
            this.setState({ step: +e.target.value });
          }}
        />

        <label htmlFor="animationDurationID">
          <h3>Write Animation Duration</h3>
        </label>

        <input
          type="number"
          name="animationDuration"
          id="animationDurationID"
          placeholder="animation duration ms"
          value={animationDuration}
          onChange={(e) => {
            this.setState({ animationDuration: +e.target.value });
          }}
        />

        <Carousel
          images={images}
          step={+step}
          frameSize={+frameSize}
          itemWidth={+itemWidth}
          animationDuration={+animationDuration}
          infinite={!false}
        />
      </div>
    );
  }
}

export default App;
