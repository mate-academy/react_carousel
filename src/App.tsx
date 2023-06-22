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
      animationDuration,
      frameSize,
      itemWidth,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <div className="settings">
          <label className="inputWrapper">
            Item width:
            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={(event) => {
                this.setState({
                  itemWidth: Number(event.target.value),
                });
              }}
            />
          </label>
          <label className="inputWrapper">
            Frame size:
            <input
              type="number"
              name="frameSize"
              min="1"
              max="10"
              value={frameSize}
              onChange={(event) => {
                this.setState({
                  frameSize: Number(event.target.value),
                });
              }}
            />
          </label>
          <label htmlFor="stepId" className="inputWrapper">
            Step:
            <input
              id="stepId"
              type="number"
              name="step"
              min="1"
              max="10"
              value={step}
              onChange={(event) => {
                this.setState({
                  step: Number(event.target.value),
                });
              }}
            />
          </label>
          <label className="inputWrapper">
            Animation duration:
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={(event) => {
                this.setState({
                  animationDuration: Number(event.target.value),
                });
              }}
            />
          </label>
          <label className="inputWrapper checkbox">
            Infinite:
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
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
