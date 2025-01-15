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
    infinite: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : parseInt(value, 10),
    }));
  };

  handeToggleInfinite = () => {
    this.setState(prevState => ({ infinite: !prevState.infinite }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="setting">
          <label htmlFor="itemId" className="options__row">
            itemWidth:
            <input
              id="itemId"
              className="option__input"
              type="number"
              name="itemWidth"
              value={itemWidth}
              min={50}
              max={500}
              onChange={this.handleInputChange}
            ></input>
          </label>

          <label htmlFor="stepId" className="options__row">
            Step:
            <input
              id="stepId"
              className="option__input"
              type="number"
              name="step"
              value={step}
              min={1}
              max={5}
              onChange={this.handleInputChange}
            ></input>
          </label>

          <label htmlFor="frameId" className="options__row">
            Frame Size:
            <input
              id="frameId"
              className="option__input"
              type="number"
              name="frameSize"
              value={frameSize}
              min={1}
              max={4}
              onChange={this.handleInputChange}
            ></input>
          </label>

          <label htmlFor="animationId" className="options__row">
            Animation Duration
            <input
              id="animationId"
              className="option__input"
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleInputChange}
            ></input>
          </label>

          <label htmlFor="infiniteId" className="options__row">
            infinite
            <input
              id="infiniteId"
              className="option__input"
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handeToggleInfinite}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
