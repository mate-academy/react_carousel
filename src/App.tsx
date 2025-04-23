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
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="form-wrapper">
          <div className="input-wrapper">
            <label htmlFor="stepId">Step:</label>
            <input
              id="stepId"
              type="number"
              value={this.state.step}
              onChange={e =>
                this.setState({
                  step: Math.min(+e.target.value, this.state.images.length),
                })
              }
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="frameId">Frame size:</label>
            <input
              id="frameId"
              type="number"
              value={this.state.frameSize}
              onChange={e =>
                this.setState({
                  frameSize: Math.min(
                    +e.target.value,
                    this.state.images.length,
                  ),
                })
              }
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="itemId">Item width:</label>
            <input
              id="itemId"
              type="number"
              value={this.state.itemWidth}
              onChange={e =>
                this.setState({ itemWidth: Math.max(+e.target.value, 0) })
              }
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="animationDuration">Animation duration:</label>
            <input
              id="animationDuration"
              type="number"
              value={this.state.animationDuration}
              onChange={e =>
                this.setState({
                  animationDuration: Math.max(+e.target.value, 0),
                })
              }
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="infinite">Infinite:</label>
            <input
              id="infinite"
              type="checkbox"
              checked={this.state.infinite}
              onChange={e => this.setState({ infinite: !!e.target.checked })}
            />
          </div>
        </div>

        <Carousel
          images={this.state.images}
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
