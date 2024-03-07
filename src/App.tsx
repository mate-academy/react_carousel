import './App.scss';
import React from 'react';
import Carousel from './components/Carousel';
import { State } from './types/Static';

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
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title"> Carousel with {images.length} images</h1>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />

        <div className="App__form">
          <label className="App__lable" htmlFor="itemId">
            Item width:
            <input
              className="App__input"
              id="itemId"
              type="number"
              value={itemWidth}
              min={0}
              step={10}
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            />
          </label>

          <label className="App__lable" htmlFor="frameId">
            Frame size:
            <input
              className="App__input"
              id="frameId"
              type="number"
              value={frameSize}
              min={1}
              max={images.length}
              onChange={e => this.setState({ frameSize: +e.target.value })}
            />
          </label>

          <label className="App__lable" htmlFor="stepId">
            Step:
            <input
              className="App__input"
              id="stepId"
              type="number"
              value={step}
              min={1}
              onChange={e => this.setState({ step: +e.target.value })}
            />
          </label>

          <label className="App__lable" htmlFor="animationDurationId">
            Animation duration:
            <input
              className="App__input"
              id="animationDurationId"
              type="number"
              value={animationDuration}
              step={100}
              onChange={e =>
                this.setState({ animationDuration: +e.target.value })
              }
            />
          </label>

          <label className="App__lable" htmlFor="infiniteId">
            Infinite:
            <input
              className="App__input"
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
