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

  componentDidMount(): void {
    document.title = 'Carousel';
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />
        <div className="Carousel__settings">
          <label htmlFor="itemId">
            Item Width:
            <input
              id="itemId"
              type="number"
              value={this.state.itemWidth}
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            />
          </label>

          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={this.state.frameSize}
              onChange={e => this.setState({ frameSize: +e.target.value })}
            />
          </label>

          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              value={this.state.step}
              onChange={e => this.setState({ step: +e.target.value })}
            />
          </label>

          <label htmlFor="animationId">
            Animation Duration (ms):
            <input
              id="animationId"
              type="number"
              value={this.state.animationDuration}
              onChange={e =>
                this.setState({ animationDuration: +e.target.value })
              }
            />
          </label>

          <label htmlFor="infiniteId">
            Infinite:
            <input
              id="infiniteId"
              type="checkbox"
              checked={this.state.infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </label>
        </div>
      </div>
    );
  }
}
export default App;
