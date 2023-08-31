import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  width: number;
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
    width: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;
    const inputValue = type === 'checkbox' ? checked : Number(value);

    this.setState({
      [name]: inputValue,
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const {
      images,
      width,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    const mainPageBoxWidth = width * frameSize;

    return (
      <div className="App" style={{ width: mainPageBoxWidth }}>
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="inputContainer">
          <label htmlFor="width" className="input-wrapp">
            Image size (px):
            <input
              type="number"
              name="width"
              id="width"
              value={width}
              onChange={this.handleInputChange}
              min={130}
              max={230}
            />
          </label>
          <label htmlFor="frameSize" className="input-wrapp">
            Frame size (px):
            <input
              type="number"
              name="frameSize"
              id="frameSize"
              value={frameSize}
              onChange={this.handleInputChange}
              min={1}
              max={10}
            />
          </label>
          <label htmlFor="step" className="input-wrapp">
            Step:
            <input
              type="number"
              name="step"
              id="step"
              onChange={this.handleInputChange}
              value={step}
              min={1}
              max={10}
            />
          </label>
          <label htmlFor="animationDuration" className="input-wrapp">
            Animation duration (ms):
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              value={animationDuration}
              step="100"
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="infinite" className="input-wrapp">
            Infinite:
            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              checked={infinite}
              onChange={this.handleInputChange}
            />
          </label>
        </div>
        <Carousel
          images={images}
          imgWidth={width}
          frameWidth={frameSize}
          scrollStep={step}
          animation={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
