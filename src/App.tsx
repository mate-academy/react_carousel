import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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
        <h1>{`Carousel with ${images.length} images`}</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <label>
          Frame size:
          <input
            type="number"
            min={1}
            max={5}
            value={frameSize}
            onChange={(event) => {
              this.setState({ frameSize: +event.currentTarget.value });
            }}
          />
        </label>

        <label>
          Item width:
          <input
            type="number"
            min={100}
            max={250}
            value={itemWidth}
            onChange={(event) => {
              this.setState({ itemWidth: +event.currentTarget.value });
            }}
          />
        </label>

        <label>
          Animation duration:
          <input
            type="number"
            min={300}
            max={2000}
            value={animationDuration}
            onChange={(event) => {
              this.setState({ animationDuration: +event.currentTarget.value });
            }}
          />
        </label>

        <label>
          Slide step:
          <input
            type="number"
            min={1}
            max={5}
            value={step}
            onChange={(event) => {
              this.setState({ step: +event.currentTarget.value });
            }}
          />
        </label>

        <input
          type="checkbox"
          checked={this.state.infinite}
          onChange={(event) => {
            this.setState({ infinite: event.currentTarget.checked });
          }}
        />
      </div>
    );
  }
}

export default App;
