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
    infinite: false,
    animationDuration: 300,
  };

  render() {
    const {
      images, itemWidth, FrameSize, step, infinite, animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">
          Carousel with
          {' '}
          {images.length}
          {' '}
          images

        </h1>

        <Carousel
          listimage={images}
          itemWidth={itemWidth}
          FrameSize={FrameSize}
          step={step}
          infinite={infinite}
          animationDuration={animationDuration}
        />

        <div className="Managment">
          <label htmlFor="itemId">
            <span>width elements</span>
            <input
              type="number"
              name="ItemWidth"
              id="itemId"
              value={this.state.itemWidth}
              onChange={
                (event) => this.setState({ itemWidth: +event.target.value })
              }
            />
          </label>
          <label htmlFor="frameId">
            <span>Frame Size</span>
            <input
              type="number"
              name="FrameSize"
              id="frameId"
              value={this.state.FrameSize}
              onChange={
                (event) => this.setState({ FrameSize: +event.target.value })
              }
            />
          </label>
          <label htmlFor="stepId">
            <span>Step</span>
            <input
              type="number"
              name="step"
              id="stepId"
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
              type="number"
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
