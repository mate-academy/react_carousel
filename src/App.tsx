import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
  };

  render() {
    const images = this.state.images;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="form">
          <div className="form__elem">
            <label htmlFor="itemId">Enter item width </label>
            <input
              type="number"
              id="itemId"
              value={this.state.itemWidth}
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            />
          </div>

          <div className="form__elem">
            <label htmlFor="frameId">Enter frame size </label>
            <input
              type="number"
              id="frameId"
              value={this.state.frameSize}
              onChange={e => this.setState({ frameSize: +e.target.value })}
            />
          </div>

          <div className="form__elem">
            <label htmlFor="stepId">Enter step </label>
            <input
              type="number"
              id="stepId"
              value={this.state.step}
              onChange={e => this.setState({ step: +e.target.value })}
            />
          </div>

          <div className="form__elem">
            <label htmlFor="animationDuration">Enter animation duration </label>
            <input
              type="number"
              id="animationDuration"
              value={this.state.animationDuration}
              onChange={e =>
                this.setState({ animationDuration: +e.target.value })
              }
            />
          </div>
        </form>

        <Carousel
          images={images}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          step={this.state.step}
          animationDuration={this.state.animationDuration}
        />
      </div>
    );
  }
}

export default App;
