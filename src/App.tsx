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

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="slider">
          <div className="slider__list">
            <Carousel
              images={images}
              step={this.state.step}
              frameSize={this.state.frameSize}
              itemWidth={this.state.itemWidth}
              animationDuration={this.state.animationDuration}
              infinite={this.state.infinite}
            />
          </div>

          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              min="2"
              max="4"
              value={this.state.step}
              onChange={(e) => this.setState({ step: +e.target.value })}
            />
          </label>
          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              type="number"
              min="2"
              max="6"
              value={this.state.frameSize}
              onChange={(e) => this.setState({ frameSize: +e.target.value })}
            />
          </label>
          <label htmlFor="itemId">
            Item Width:
            <input
              id="itemId"
              type="number"
              min="100"
              max="500"
              value={this.state.itemWidth}
              onChange={(e) => this.setState({ itemWidth: +e.target.value })}
            />
          </label>
          <label htmlFor="durationId">
            Animation Duration:
            <input
              id="durationId"
              type="number"
              min="100"
              max="5000"
              value={this.state.animationDuration}
              onChange={(e) => this
                .setState({ animationDuration: +e.target.value })}
            />
          </label>
          <label htmlFor="infinite">
            Infinite:
            <input
              type="checkbox"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => this
                .setState({ infinite: e.target.checked })}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
