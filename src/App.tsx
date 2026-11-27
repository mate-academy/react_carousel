import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

class App extends React.Component<{}, State> {
  state: State = {
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
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        <label htmlFor="itemId">Item width (px)</label>
        <input
          type="number"
          name="itemWidth"
          id="itemId"
          min={1}
          step={1}
          value={itemWidth}
          required
          onChange={event => {
            if (event.target.validity.valid) {
              this.setState({
                itemWidth: Number(event.target.value),
              });
            }
          }}
        />

        <label htmlFor="frameId">Frame size</label>
        <input
          type="number"
          name="frameSize"
          id="frameId"
          min={1}
          step={1}
          max={images.length}
          value={frameSize}
          required
          onChange={event => {
            if (event.target.validity.valid) {
              this.setState({
                frameSize: Number(event.target.value),
              });
            }
          }}
        />

        <label htmlFor="stepId">Step</label>
        <input
          type="number"
          name="step"
          id="stepId"
          min={1}
          step={1}
          value={step}
          required
          onChange={event => {
            if (event.target.validity.valid) {
              this.setState({
                step: Number(event.target.value),
              });
            }
          }}
        />

        <label htmlFor="animationDuration">Animation duration (ms)</label>
        <input
          type="number"
          name="animationDuration"
          id="animationDuration"
          min={0}
          step={1}
          value={animationDuration}
          required
          onChange={event => {
            if (event.target.validity.valid) {
              this.setState({
                animationDuration: Number(event.target.value),
              });
            }
          }}
        />

        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
