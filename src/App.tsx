import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
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
    infinite: false,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : +value,
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const {
      images,

      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="title">
          Carousel with {images.length} images
        </h1>

        <div className="controls">
          <label htmlFor="itemId" className="controls__label">
            Item Width:
            <input
              id="itemId"
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleChange}
              className="controls__input"
            />
          </label>

          <label htmlFor="frameId" className="controls__label">
            Frame Size:
            <input
              id="frameId"
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.handleChange}
              className="controls__input"
            />
          </label>

          <label htmlFor="stepId" className="controls__label">
            Step:
            <input
              id="stepId"
              type="number"
              name="step"
              value={step}
              onChange={this.handleChange}
              className="controls__input"
            />
          </label>

          <label htmlFor="durationId" className="controls__label">
            Animation Duration (ms):
            <input
              id="durationId"
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleChange}
              className="controls__input"
            />
          </label>

          <label htmlFor="infiniteId" className="controls__label">
            Infinite:
            <input
              id="infiniteId"
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleChange}
              className="controls__input"
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
