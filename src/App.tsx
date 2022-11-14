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

export class App extends React.Component<{}, State> {
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
    infinite: false,
  };

  changeProp = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      ...state,
      [e.target.name]: Number(e.target.value),
    }));
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="App__form">
          <label>
            Item width:
            <input
              className="App__input"
              type="number"
              name="itemWidth"
              value={itemWidth}
              min="50"
              max="400"
              onChange={this.changeProp}
            />
          </label>

          <label>
            FrameSize:
            <input
              className="App__input"
              type="number"
              name="frameSize"
              value={frameSize}
              min="1"
              max={images.length - 1}
              onChange={this.changeProp}
            />
          </label>

          <label>
            Step:
            <input
              className="App__input"
              type="number"
              name="step"
              value={step}
              min="1"
              max={frameSize}
              onChange={this.changeProp}
            />
          </label>

          <label>
            Animation duration:
            <input
              className="App__input"
              type="number"
              name="animationDuration"
              value={animationDuration}
              min="100"
              max="5000"
              step="100"
              onChange={this.changeProp}
            />
          </label>
        </form>
      </div>
    );
  }
}
