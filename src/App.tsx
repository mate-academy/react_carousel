import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean,
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
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="form" action="#">
          <label className="label" htmlFor="stepName">Step:</label>
          <input
            type="number"
            id="step_id"
            className="input"
            value={step}
            onChange={(event) => {
              this.setState({
                step: +event.target.value,
              });
            }}
            min="1"
            max={images.length - 4}
          />

          <label className="label" htmlFor="frameSizeName">
            Frame Size:
          </label>
          <input
            type="number"
            id="size_id"
            className="input"
            value={frameSize}
            onChange={(event) => {
              this.setState({
                frameSize: +event.target.value,
              });
            }}
            min="1"
            max={images.length}
          />

          <label className="label" htmlFor="itemWidthName">
            Width:
          </label>
          <input
            type="number"
            id="width_id"
            className="input"
            value={itemWidth}
            onChange={(event) => {
              this.setState({
                itemWidth: +event.target.value,
              });
            }}
            min="50"
            step="10"
            max="450"
          />

          <label className="label" htmlFor="animationName">
            Animation duration:
          </label>
          <input
            type="number"
            id="animation_id"
            className="input"
            value={animationDuration}
            onChange={(event) => {
              this.setState({
                animationDuration: +event.target.value,
              });
            }}
            min="1000"
          />

          <label className="label" htmlFor="infiniteName">
            Endlessly
          </label>
          <input
            type="checkbox"
            id="infinite_id"
            className="input"
            onChange={(event) => {
              this.setState({
                infinite: event.target.checked,
              });
            }}
          />
        </form>
      </div>
    );
  }
}

export default App;
