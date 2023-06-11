/* eslint-disable no-console */
/* eslint-disable padded-blocks */
import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean,
  autoplay: boolean,
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
    autoplay: false,
  };

  inputHandler = (e: { currentTarget: HTMLInputElement }) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'step':
        this.setState({ step: +value });
        break;

      case 'frameSize':
        this.setState({ frameSize: +value });
        break;

      case 'itemWidth':
        this.setState({ itemWidth: +value });
        break;

      case 'animationDuration':
        this.setState({ animationDuration: +value });
        break;

      case 'autoplay':
        this.setState({ autoplay: e.currentTarget.checked });
        break;

      default:
        this.setState({ infinite: e.currentTarget.checked });
        break;
    }
  };

  render() {
    const {
      images,
      step = 3,
      frameSize = 3,
      itemWidth = 130,
      animationDuration = 1000,
      infinite = false,
      autoplay = false,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1
          data-cy="title"
          className="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          autoplay={autoplay}
          onAutoplayChange={(autoplayStatus) => {
            this.setState({ autoplay: autoplayStatus });
          }}
        />

        <form action="#" className="form">
          <label className="label">
            {`slide step [${step}] `}
            <input
              className="input"
              type="number"
              name="step"
              id="inputStep"
              min="1"
              max="3"
              placeholder="1-3"
              onChange={this.inputHandler}
            />
          </label>
          <label className="label">
            {`frame size [${frameSize}] `}
            <input
              className="input"
              type="number"
              name="frameSize"
              id="frameSize"
              min="1"
              max="5"
              placeholder="1-5"
              onChange={this.inputHandler}
            />
          </label>
          <label className="label">
            {`slide width [${itemWidth}] `}
            <input
              className="input"
              type="number"
              name="itemWidth"
              id="itemWidth"
              min="130"
              max="350"
              step="20"
              placeholder="100-350"
              onChange={this.inputHandler}
            />
          </label>
          <label className="label">
            {`animation [${animationDuration}ms] `}
            <input
              className="input"
              type="number"
              name="animationDuration"
              id="animationDuration"
              min="100"
              max="5000"
              step="100"
              placeholder="100-5000"
              onChange={this.inputHandler}
            />
          </label>
          <label className="label">
            {`autoplay [${this.state.autoplay}]`}
            <input
              className="checkbox"
              type="checkbox"
              name="autoplay"
              id="autoplay"
              checked={this.state.autoplay}
              onChange={this.inputHandler}
            />
          </label>

          <label className="label">
            {`infinite [${this.state.infinite}]`}
            <input
              className="checkbox"
              type="checkbox"
              name="infinite"
              id="infinite"
              checked={this.state.infinite}
              onChange={this.inputHandler}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
