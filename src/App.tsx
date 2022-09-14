import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  changeProp = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      ...state,
      [e.target.name]: +e.target.value,
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
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="inputs__wrapper">
          <label>
            Item width:
            <input
              className="input"
              name="itemWidth"
              type="number"
              value={itemWidth}
              onChange={this.changeProp}
            />
          </label>
          <label>
            Frame size:
            <input
              className="input"
              name="frameSize"
              type="number"
              max="10"
              value={frameSize}
              onChange={this.changeProp}
            />
          </label>
          <label>
            Step:
            <input
              className="input"
              name="step"
              type="number"
              max="9"
              value={step}
              onChange={this.changeProp}
            />
          </label>
          <label>
            Animation duration:
            <input
              className="input"
              name="animationDuration"
              type="number"
              value={animationDuration}
              onChange={this.changeProp}
            />
          </label>
          <label>
            Infinite:
            <input
              className="checkbox"
              name="animationDuration"
              type="checkbox"
              onChange={() => {
                this.setState(prev => ({ infinite: !prev.infinite }));
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
