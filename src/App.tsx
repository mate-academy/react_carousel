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
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="CarouselSettings">
          <label htmlFor="itemId">
            ItemWidth
            <input
              id="itemId"
              type="number"
              value={this.state.itemWidth}
              onChange={event => {
                this.setState({ itemWidth: Number(event.target.value) });
              }}
            />
          </label>
          <label htmlFor="frameId">
            Frame
            <input
              id="frameId"
              type="number"
              value={this.state.frameSize}
              onChange={event => {
                this.setState({ frameSize: Number(event.target.value) });
              }}
            />
          </label>
          <label htmlFor="stepId">
            Step
            <input
              id="stepId"
              type="number"
              value={this.state.step}
              onChange={event => {
                this.setState({ step: Number(event.target.value) });
              }}
            />
          </label>

          <label htmlFor="animationId">
            Animation Duration
            <input
              id="animationId"
              type="number"
              value={this.state.animationDuration}
              onChange={event => {
                this.setState({
                  animationDuration: Number(event.target.value),
                });
              }}
            />
          </label>

          <label htmlFor="infiniteId">
            Infinite
            <input
              type="checkbox"
              id="infiniteId"
              checked={infinite}
              onChange={event => {
                this.setState({
                  infinite: event.target.checked,
                });
              }}
            />
          </label>
        </div>

        <Carousel
          images={[...images]}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
          infinite={infinite}
          step={step}
        />
      </div>
    );
  }
}

export default App;
