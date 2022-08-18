import React from 'react';
import { Carousel } from './components/Carousel';
import 'bulma/css/bulma.min.css';
import './App.scss';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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
        <h1 data-cy="title" className="App__title title">
          {`Carousel with ${images.length} images`}
        </h1>
        <form className="App__options">
          <label className="App__input App__input--item-width">
            Item width:
            <input
              type="number"
              min="0"
              defaultValue={itemWidth}
              onChange={(e) => {
                this.setState({ itemWidth: +e.target.value });
              }}
            />
          </label>

          <label className="App__input">
            Frame size:
            <input
              type="number"
              min="2"
              max={images.length}
              defaultValue={frameSize}
              onChange={(e) => {
                this.setState({ frameSize: +e.target.value });
              }}
            />
          </label>

          <label className="App__input App__input--step">
            Step:
            <input
              type="number"
              min="0"
              max={images.length}
              defaultValue={step}
              onChange={(e) => {
                this.setState({ step: +e.target.value });
              }}
            />
          </label>

          <label
            className="
              App__input
              App__input--animation-duration"
          >
            Animation duration:
            <input
              type="number"
              min="0"
              defaultValue={animationDuration}
              onChange={(e) => {
                this.setState({ animationDuration: +e.target.value });
              }}
            />
          </label>

          <label className="App__input">
            Infinite:
            <input
              type="checkbox"
              checked={infinite}
              className="App__input--checkbox"
              onChange={() => {
                this.setState({ infinite: !infinite });
              }}
            />
          </label>
        </form>

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
