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
        this.setState({ [name]: +value });
        break;

      case 'frameSize':
        this.setState({ [name]: +value });
        break;

      case 'itemWidth':
        this.setState({ [name]: +value });
        break;

      case 'animationDuration':
        this.setState({ [name]: +value });
        break;

      case 'autoplay':
        this.setState({ autoplay: e.currentTarget.checked, infinite: false });
        break;

      default:
        this.setState({ infinite: e.currentTarget.checked, autoplay: false });
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
            Slide step
            <input
              className="input"
              type="number"
              name="step"
              id="inputStep"
              min="1"
              max="3"
              placeholder={`${step}`}
              onChange={this.inputHandler}
            />
          </label>
          <label className="label">
            Frame size
            <input
              className="input"
              type="number"
              name="frameSize"
              id="frameSize"
              min="1"
              max="5"
              placeholder={`${frameSize}`}
              onChange={this.inputHandler}
            />
          </label>
          <label className="label">
            Slide width
            <input
              className="input"
              type="number"
              name="itemWidth"
              id="itemWidth"
              min="130"
              max="350"
              step="20"
              placeholder={`${itemWidth}`}
              onChange={this.inputHandler}
            />
          </label>
          <label className="label">
            Animation
            <input
              className="input"
              type="number"
              name="animationDuration"
              id="animationDuration"
              min="100"
              max="5000"
              step="100"
              placeholder={`${animationDuration}`}
              onChange={this.inputHandler}
            />
          </label>
          <label className="label">
            Autoplay
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
            Is finite
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
