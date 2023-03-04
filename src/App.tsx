import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  withOfItem: number;
  frameSize: number;
  rollingStep: number;
  animation: number;
  infiniteRolling: boolean;
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

    withOfItem: 130,
    frameSize: 3,
    rollingStep: 3,
    animation: 1000,
    infiniteRolling: false,
  };

  render() {
    const {
      images,
      withOfItem,
      frameSize,
      rollingStep,
      animation,
      infiniteRolling,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>
        <form className="Options">
          <label className="label" htmlFor="itemWidth">
            Item width:
            <input
              type="number"
              className="input"
              value={withOfItem}
              id="itemWidth"
              onChange={(event) => {
                this.setState({ withOfItem: +event.target.value });
              }}
            />
          </label>

          <label className="label" htmlFor="frameSize">
            Frame size:
            <input
              type="number"
              min={0}
              max={10}
              className="input"
              value={frameSize}
              id="frameSize"
              onChange={(event) => {
                this.setState({ frameSize: +event.target.value });
              }}
            />
          </label>

          <label className="label" htmlFor="step">
            Step:
            <input
              type="number"
              min={0}
              max={10}
              className="input"
              value={rollingStep}
              id="step"
              onChange={(event) => {
                this.setState({ rollingStep: +event.target.value });
              }}
            />
          </label>

          <label className="label" htmlFor="animationDuration">
            Animation Duration:
            <input
              type="number"
              className="input"
              value={animation}
              id="animationDuration"
              onChange={(event) => {
                this.setState({ animation: +event.target.value });
              }}
            />
          </label>

          <label className="label" htmlFor="infinity">
            Infinite:
            <input
              type="checkbox"
              className="input"
              id="infinite"
              checked={infiniteRolling}
              onChange={() => {
                this.setState({ infiniteRolling: !infiniteRolling });
              }}
            />
          </label>
        </form>
        <Carousel
          images={images}
          step={rollingStep}
          frameSize={frameSize}
          itemWidth={withOfItem}
          animationDuration={animation}
          infinite={infiniteRolling}
        />
      </div>
    );
  }
}

export default App;
