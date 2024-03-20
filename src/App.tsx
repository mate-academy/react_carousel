import './App.scss';

import Carousel from './components/Carousel';
import React from 'react';

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

        <Carousel
          images={images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />

        <div className="settings">
          animationDuration:
          <br />
          <input
            type="number"
            min={0}
            value={this.state.animationDuration}
            onChange={e => {
              this.setState({ animationDuration: e.target.valueAsNumber });
            }}
          />
          ms
          <br />
          <br />
          frameSize:
          <br />
          <input
            type="number"
            min={1}
            max={images.length}
            value={this.state.frameSize}
            onChange={e => {
              this.setState({ frameSize: e.target.valueAsNumber });
            }}
          />
          <br />
          <br />
          itemWidth:
          <br />
          <input
            type="number"
            min={1}
            value={this.state.itemWidth}
            onChange={e => {
              this.setState({ itemWidth: e.target.valueAsNumber });
            }}
          />
          px
          <br />
          <br />
          step:
          <br />
          <input
            type="number"
            min={1}
            max={images.length}
            value={this.state.step}
            onChange={e => {
              this.setState({ step: e.target.valueAsNumber });
            }}
          />
          <br />
          <br />
          infinite:
          <br />
          <input
            type="checkbox"
            checked={this.state.infinite}
            onChange={e => {
              this.setState({ infinite: e.target.checked });
            }}
          />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
