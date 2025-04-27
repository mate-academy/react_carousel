import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
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
    infinity: false,
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy = "title">Carousel with {images.length} images</h1>
        <div className="form">
          <div>
            <label htmlFor="itemId">Item width: </label>
            <input
              id="itemId"
              type="number"
              value={this.state.itemWidth}
              onChange={e =>
                this.setState({ itemWidth: Math.max(+e.target.value, 0) })
              }
            />
          </div>
          <div>
            <label htmlFor="frameId">Frame size: </label>
            <input
              id="frameId"
              type="number"
              value={this.state.frameSize}
              onChange={e =>
                this.setState({ frameSize: Math.max(+e.target.value, 0) })
              }
            />
          </div>
          <div>
            <label htmlFor="stepId">Step number: </label>
            <input
              id="stepId"
              type="number"
              value={this.state.step}
              onChange={e =>
                this.setState({ step: Math.max(+e.target.value, 0) })
              }
            />
          </div>
          <div>
            <label htmlFor="animationId">Animation duration: </label>
            <input
              id="animationId"
              type="number"
              value={this.state.animationDuration}
              onChange={e =>
                this.setState({
                  animationDuration: Math.max(+e.target.value, 0),
                })
              }
            />
          </div>
          <div>
            <label htmlFor="infinityId">Infinity: </label>
            <input
              id="infinityId"
              type="checkbox"
              checked={this.state.infinity}
              onChange={e => this.setState({ infinity: !!e.target.checked })}
            />
          </div>
        </div>

        <Carousel
          images={this.state.images}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          step={this.state.step}
          animationDuration={this.state.animationDuration}
          infinity={this.state.infinity}
        />
      </div>
    );
  }
}

export default App;
