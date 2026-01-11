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
    frameSize: 2,
    step: 2,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="controls">
          <label>
            Item width:
            <input
              type="number"
              value={this.state.itemWidth}
              onChange={e =>
                this.setState({ itemWidth: Number(e.target.value) })
              }
              min={1}
            />
          </label>

          <label>
            Frame size:
            <input
              type="number"
              value={this.state.frameSize}
              onChange={e =>
                this.setState({ frameSize: Number(e.target.value) })
              }
              min={1}
            />
          </label>

          <label>
            Step:
            <input
              type="number"
              value={this.state.step}
              onChange={e => this.setState({ step: Number(e.target.value) })}
              min={1}
            />
          </label>

          <label>
            Animation ms:
            <input
              type="number"
              value={this.state.animationDuration}
              onChange={e =>
                this.setState({ animationDuration: Number(e.target.value) })
              }
              min={0}
            />
          </label>

          <label>
            Manage infinite:
            <input
              type="checkbox"
              checked={this.state.infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </label>
        </div>

        <Carousel
          images={images}
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
