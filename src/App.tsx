import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  itemWidth: number,
  frameSize: number,
  animationDuration: number,
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
    itemWidth: 130,
    frameSize: 3,
    animationDuration: 1000,
  };

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      type,
      checked,
      value,
    } = e.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: type !== 'checkbox' ? +value : checked,
    }));
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      step,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with
          ${images.length}
          images`}
        </h1>

        <form className="form" action="/">
          <label htmlFor="itemId" className="label">
            <span>
              Item Width:
            </span>
            <input
              name="itemWidth"
              type="number"
              id="itemId"
              min={130}
              value={itemWidth}
              onChange={this.handleOnChange}
            />
          </label>

          <label htmlFor="frameId" className="label frame-size">
            <span>
              Frame Size:
            </span>
            <input
              name="frameSize"
              type="number"
              id="frameId"
              min={1}
              value={frameSize}
              onChange={this.handleOnChange}
            />
          </label>

          <label htmlFor="stepId" className="label step">
            <span>
              Step:
            </span>
            <input
              name="step"
              type="number"
              id="stepId"
              min={1}
              value={step}
              onChange={this.handleOnChange}
            />
          </label>

          <label htmlFor="animationDuration" className="label">
            <span>
              Animation duration:
            </span>
            <input
              name="animationDuration"
              type="number"
              id="animationDuration"
              min={500}
              step={500}
              value={animationDuration}
              onChange={this.handleOnChange}
            />
          </label>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
