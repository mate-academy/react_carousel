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

        <div className="inputs__container">
          <input
            onChange={e => this.setState({ itemWidth: +e.target.value })}
            type="number"
            placeholder="Width"
          />
          <input
            onChange={e => this.setState({ frameSize: +e.target.value })}
            type="number"
            placeholder="Frame size"
          />
          <input
            onChange={e => this.setState({ step: +e.target.value })}
            type="number"
            placeholder="Step"
          />
          <input
            onChange={e =>
              this.setState({ animationDuration: +e.target.value })
            }
            type="number"
            placeholder="Animation duration"
          />
          <label htmlFor="input-check">Infinite</label>
          <input
            id="input-check"
            defaultChecked={this.state.infinite}
            type="checkbox"
            onChange={() => this.setState({ infinite: !this.state.infinite })}
          />
        </div>

        <Carousel
          images={images}
          gap={10}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />
      </div>
    );
  }
}

export default App;
