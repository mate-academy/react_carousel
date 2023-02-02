import React from 'react';
import Carousel from './components/Carousel';
import './App.scss';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  duration: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    duration: 0,
    animationDuration: 1000,
    infinite: false,
  };

  onNext = (step: number) => {
    const {
      images, itemWidth, frameSize, duration, infinite,
    } = this.state;
    const stepFrame = step * itemWidth;
    const lastFrame = frameSize * itemWidth - images.length * itemWidth;

    if (duration <= lastFrame && !infinite) {
      return;
    }

    if (duration <= lastFrame && infinite) {
      this.setState({
        duration: 0,
      });

      return;
    }

    this.setState((prevState) => ({
      duration: prevState.duration - stepFrame,
    }));
  };

  onPrev = (step: number) => {
    const {
      images, itemWidth, frameSize, duration, infinite,
    } = this.state;
    const stepFrame = step * itemWidth;
    const lastFrame = frameSize * itemWidth - images.length * itemWidth;

    if (duration === 0 && !infinite) {
      return;
    }

    if (duration >= 0 && infinite) {
      this.setState({
        duration: lastFrame,
      });

      return;
    }

    this.setState((prevState) => ({
      duration: prevState.duration + stepFrame,
    }));
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, type, checked,
    } = event.currentTarget;

    this.setState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
      duration: 0,
    }));
  };

  render() {
    const {
      images, itemWidth, frameSize, duration, step, animationDuration, infinite,
    } = this.state;

    const maxFrameSize = images.length / 2;

    return (
      <div className="App">

        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          duration={duration}
          step={step}
          animationDuration={animationDuration}
          onNext={this.onNext}
          onPrev={this.onPrev}
        />

        <div className="Abilities">
          <div>
            <label htmlFor="itemWidth">ItemWidth</label>
            <input
              name="itemWidth"
              id="itemWidth"
              type="number"
              value={itemWidth}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="frameSize">FrameSize</label>
            <input
              name="frameSize"
              id="frameSize"
              type="number"
              value={frameSize}
              max={maxFrameSize}
              min={1}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="step">Step</label>
            <input
              name="step"
              id="step"
              type="number"
              value={step}
              max={frameSize}
              min={1}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="animationDuration">AnimationDuration</label>
            <input
              name="animationDuration"
              id="animationDuration"
              type="number"
              step="100"
              value={animationDuration}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="infinite">Infinite</label>
            <input
              name="infinite"
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
