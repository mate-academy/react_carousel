import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    infinite: false,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="app">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <p>Item size</p>
        <input
          type="number"
          name="itemWidth"
          defaultValue={itemWidth}
          onChange={e => this.setState({ itemWidth: +e.target.value })}
        />

        <p>Frame size</p>
        <input
          type="number"
          name="frameSize"
          defaultValue={frameSize}
          min={0}
          max={images.length}
          onChange={e => this.setState({ frameSize: +e.target.value })}
        />

        <p>Step</p>
        <input
          type="number"
          name="step"
          defaultValue={step}
          min={1}
          max={images.length - 1}
          onChange={e => this.setState({ step: +e.target.value })}
        />

        <p>Animation time</p>
        <input
          type="number"
          name="animationDuration"
          defaultValue={animationDuration}
          min={0}
          onChange={e => this.setState({ animationDuration: +e.target.value })}
        />

        <div>
          <label htmlFor="infinite">
            Infinite
            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              checked={infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </label>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
