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

        <div>
          <label htmlFor="stepId">Крок:</label>
          <input
            id="stepId"
            type="number"
            value={this.state.step}
            onChange={e => this.setState({ step: Number(e.target.value) })}
          />
        </div>
        <div>
          <label htmlFor="itemId">Ширина:</label>
          <input
            id="itemId"
            type="number"
            value={this.state.itemWidth}
            onChange={e => this.setState({ itemWidth: Number(e.target.value) })}
          />
        </div>
        <div>
          <label htmlFor="frameId">Розмір кадру:</label>
          <input
            id="frameId"
            type="number"
            value={this.state.frameSize}
            onChange={e => this.setState({ frameSize: Number(e.target.value) })}
          />
        </div>

        <div>
          <label htmlFor="animationDurationId">Час анімації:</label>
          <input
            id="animationDurationId"
            type="number"
            value={this.state.animationDuration}
            onChange={e =>
              this.setState({ animationDuration: Number(e.target.value) })
            }
          />
        </div>

        <Carousel
          images={images}
          step={this.state.step}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />
      </div>
    );
  }
}

export default App;
