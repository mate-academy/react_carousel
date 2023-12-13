import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="inputs">
          <label htmlFor="itemId">Item width:</label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={(e) => this.setState({
              itemWidth: Number(e.target.value) || 0,
            })}
          />

          <label htmlFor="frameId">Frame size:</label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={(e) => this.setState({
              frameSize: Number(e.target.value) || 0,
            })}
          />

          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={(e) => this.setState({
              step: Number(e.target.value) || 0,
            })}
          />

          <label htmlFor="animationId">Animation duration:</label>
          <input
            id="animationId"
            type="number"
            value={animationDuration}
            onChange={(e) => this.setState({
              animationDuration: Number(e.target.value) || 0,
            })}
          />
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
