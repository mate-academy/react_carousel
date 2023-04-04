import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div>
          <label className="App__label">
            ItemWidth
            <input
              className="App__input"
              type="number"
              value={itemWidth}
              min={100}
              max={300}
              step={10}
              onChange={(event) => {
                this.setState({
                  itemWidth: +event.target.value,
                });
              }}
            />
          </label>

          <label className="App__label">
            FrameSize
            <input
              className="App__input"
              type="number"
              value={frameSize}
              min={1}
              max={images.length}
              step={1}
              onChange={(event) => {
                this.setState({
                  frameSize: +event.target.value,
                });
              }}
            />
          </label>

          <label className="App__label">
            Step
            <input
              className="App__input"
              type="number"
              value={step}
              min={1}
              max={images.length}
              step={1}
              onChange={(event) => {
                this.setState({
                  step: +event.target.value,
                });
              }}
            />
          </label>

          <label className="App__label">
            AnimationDuration
            <input
              className="App__input"
              type="number"
              value={animationDuration}
              min={500}
              max={5000}
              step={100}
              onChange={(event) => {
                this.setState({
                  animationDuration: +event.target.value,
                });
              }}
            />
          </label>

          <label className="App__label">
            Infinity
            <input
              type="checkbox"
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
