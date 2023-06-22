/* eslint-disable react/jsx-one-expression-per-line */
import { Component } from 'react';
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

export class App extends Component<{}, State> {
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
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="App__field">
          <label htmlFor="step">
            Step:
          </label>

          <input
            type="number"
            id="step"
            min="1"
            max={images.length}
            value={step}
            onChange={(event) => this.setState({
              step: +event.target.value,
            })}
          />

          <label htmlFor="frameSize">
            Frame size:
          </label>

          <input
            type="number"
            id="frameSize"
            min="1"
            max={images.length}
            value={frameSize}
            onChange={(event) => this.setState({
              frameSize: +event.target.value,
            })}
          />

          <label htmlFor="itemWidth">
            Item width:
          </label>

          <input
            type="number"
            id="itemWidth"
            min="100"
            max="200"
            value={itemWidth}
            onChange={(event) => this.setState({
              itemWidth: +event.target.value,
            })}
          />

          <label htmlFor="animationDuration">
            Animation duration:
          </label>

          <input
            type="number"
            id="animationDuration"
            value={animationDuration}
            onChange={(event) => this.setState({
              animationDuration: +event.target.value,
            })}
          />

          <label htmlFor="infinite">
            Infinite:
          </label>

          <input
            type="checkbox"
            id="infinite"
            checked={infinite}
            onChange={(event) => this.setState({
              infinite: event.target.checked,
            })}
          />
        </div>
      </div>
    );
  }
}
