import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  isInfinity: boolean;
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
    step: 1,
    itemWidth: 130,
    frameSize: 2,
    isInfinity: false,
    animationDuration: 1000,
  };

  render() {
    const {
      images,
      step,
      itemWidth,
      isInfinity,
      frameSize,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          step={step}
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          isInfinite={isInfinity}
          animationDuration={animationDuration}
        />

        <form className="App__form" method="post">
          <h3>Step</h3>
          <input
            type="number"
            value={step}
            name="step"
            onChange={(event) => this.setState({ step: +event.target.value })}
          />

          <h3>Item width</h3>
          <input
            type="number"
            value={itemWidth}
            name="itemWidth"
            onChange={
              (event) => this.setState({ itemWidth: +event.target.value })
            }
          />

          <h3>Frame size</h3>
          <input
            type="number"
            value={frameSize}
            name="frameSize"
            onChange={
              (event) => this.setState({ frameSize: +event.target.value })
            }
          />
          <h3>Animation duration</h3>
          <input
            type="number"
            value={animationDuration}
            name="animationDuration"
            onChange={
              (event) => this.setState(
                { animationDuration: +event.target.value },
              )
            }
          />

          <h3>Infinity</h3>
          <input
            type="checkbox"
            checked={isInfinity}
            name="isInfinity"
            onChange={
              (event) => this.setState({ isInfinity: event.target.checked })
            }
          />
        </form>
      </div>
    );
  }
}

export default App;
