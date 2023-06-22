import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinity: boolean;
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
    infinity: false,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          step={step}
          infinity={infinity}
        />

        <label htmlFor="1">
          Item width:
          <input
            className="Input"
            id="1"
            type="number"
            name="Item width"
            min={130}
            max={1300}
            step={5}
            value={itemWidth}
            onChange={(event) => {
              this.setState({
                itemWidth: +event.target.value,
              });
            }}
          />
        </label>

        <label htmlFor="2">
          Frame size:
          <input
            className="Input"
            id="2"
            type="number"
            name="Frame size"
            min={1}
            max={10}
            step={1}
            value={frameSize}
            onChange={(event) => {
              this.setState({
                frameSize: +event.target.value,
              });
            }}
          />
        </label>

        <label htmlFor="3">
          Step:
          <input
            className="Input"
            id="3"
            type="number"
            name="Step"
            min={1}
            max={7}
            step={1}
            value={step}
            onChange={(event) => {
              this.setState({
                step: +event.target.value,
              });
            }}
          />
        </label>

        <label htmlFor="4">
          Animation:
          <input
            className="Input"
            id="4"
            type="number"
            name="Animation"
            min={1000}
            max={2000}
            step={100}
            value={animationDuration}
            onChange={(event) => {
              this.setState({
                animationDuration: +event.target.value,
              });
            }}
          />
        </label>

        <label htmlFor="5">
          Infiniti:
          <input
            className="Input"
            id="5"
            type="checkbox"
            name="Infiniti"
            checked={infinity}
            onChange={() => {
              this.setState({
                infinity: !infinity,
              });
            }}
          />
        </label>
      </div>
    );
  }
}

export default App;
