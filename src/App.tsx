import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <div className="App__form">
          {/* eslint-disable-next-line */}
          <h1 className="App__title" data-cy="title">Carousel with {images.length} images</h1>
          <label htmlFor="step">
            <p className="App__text">Step</p>
            <input
              type="number"
              className="App__input"
              name="step"
              id="step"
              max="10"
              min="1"
              value={step}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="frameSize">
            <p className="App__text">Frame size</p>
            <input
              type="number"
              className="App__input"
              name="frameSize"
              id="frameSize"
              max="10"
              min="1"
              value={frameSize}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="itemWidth">
            <p className="App__text">Item Width</p>
            <input
              type="number"
              className="App__input"
              name="itemWidth"
              id="itemWidth"
              min="130"
              step="10"
              value={itemWidth}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="animationDuration">
            <p className="App__text">Animation Duration</p>
            <input
              type="number"
              className="App__input"
              name="animationDuration"
              id="animationDuration"
              min="500"
              step="100"
              value={animationDuration}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="infinite">
            <p className="App__text">Infinite</p>
            <input
              type="checkbox"
              name="infinite"
              className="App__input"
              id="infinite"
              value={animationDuration}
              checked={this.state.infinite}
              onChange={(event) => {
                this.setState({ infinite: event.target.checked });
              }}
            />
          </label>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
