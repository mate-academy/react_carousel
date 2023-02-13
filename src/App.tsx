import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number,
  FrameSize: number,
  step: number
  infinite: boolean,
  animationDuration: number
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
    FrameSize: 3,
    step: 3,
    infinite: true,
    animationDuration: 300,
  };

  render() {
    const {
      images, itemWidth, FrameSize, step, infinite, animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>
          Carousel with
          {' '}
          {images.length}
          {' '}
          images

        </h1>

        <Carousel
          listimage={images}
          itemWidth={itemWidth}
          frameSize={FrameSize}
          step={step}
          infinite={infinite}
          animationDuration={animationDuration}
        />

        <div className="Managment">
          <label htmlFor="ItemWidth">
            <span>width elements</span>
            <input
              type="text"
              name="ItemWidth"
              id="ItemWidth"
              value={this.state.itemWidth}
              onChange={
                (event) => this.setState({ itemWidth: +event.target.value })
              }
            />
          </label>
          <label htmlFor="FrameSize">
            <span>Frame Size</span>
            <input
              type="text"
              name="FrameSize"
              id="FrameSize"
              value={this.state.FrameSize}
              onChange={
                (event) => this.setState({ FrameSize: +event.target.value })
              }
            />
          </label>
          <label htmlFor="step">
            <span>Step</span>
            <input
              type="text"
              name="step"
              id="step"
              value={this.state.step}
              onChange={
                (event) => this.setState({ step: +event.target.value })
              }
            />
          </label>
          <label htmlFor="infinite">
            <span>infinite</span>
            <input
              type="checkbox"
              name="infinite"
              id="infinite"
              checked={this.state.infinite}
              onChange={() => this.setState({ infinite: !infinite })}
            />
          </label>
          <label htmlFor="animationDuration">
            <span>Animation Duration</span>
            <input
              type="text"
              name="animationDuration"
              id="animationDuration"
              value={this.state.animationDuration}
              onChange={
                (event) => this.setState(
                  { animationDuration: +event.target.value },
                )
              }
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
