import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './interface';

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
    frameSize: 3,
    itemWidth: 130,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <div className="input_container">
          <label
            htmlFor="frame"
          >
            Frame Size
            <input
              id="frame"
              type="number"
              min={1}
              max={10}
              value={frameSize}
              onChange={(event) => {
                this.setState({
                  frameSize: +event.target.value,
                });
              }}
            />
          </label>
          <label
            htmlFor="width"
          >
            Item Width
            <input
              id="width"
              type="number"
              min={130}
              max={260}
              step={1}
              value={itemWidth}
              onChange={(event) => {
                this.setState({
                  itemWidth: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="step"
          >
            Step
            <input
              id="step"
              type="number"
              min={1}
              max={10}
              step={1}
              value={step}
              onChange={(event) => {
                this.setState({
                  step: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="delay"
          >
            Delay
            <input
              id="delay"
              type="number"
              min={1}
              step={10}
              value={animationDuration}
              onChange={(event) => {
                this.setState({
                  animationDuration: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="infinite"
          >
            Infinite
            <input
              type="checkbox"
              id="infinite"
              onChange={(event) => {
                this.setState({
                  infinite: event.target.checked,
                });
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
