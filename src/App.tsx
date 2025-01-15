import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'infinite') {
      this.setState(prevState => ({
        ...prevState,
        [name]: !this.state.infinite,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        [name]: +value,
      }));
    }
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form action="" className="form">
          <div className="form-item">
            <label className="form-label" htmlFor="itemId">
              Item Width
            </label>
            <input
              className="form-input"
              id="itemId"
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-item">
            <label className="form-label" htmlFor="stepId">
              Step
            </label>
            <input
              className="form-input"
              id="stepId"
              type="number"
              name="step"
              value={step}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-item">
            <label className="form-label" htmlFor="frameId">
              Frame size
            </label>
            <input
              className="form-input"
              id="frameId"
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-item">
            <label className="form-label" htmlFor="duration">
              Animation duration
            </label>
            <input
              className="form-input"
              id="duration"
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-item form-checkbox">
            <label className="form-label" htmlFor="infinite">
              Infinite
            </label>
            <input
              className="form-input"
              id="infinite"
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleChange}
            />
          </div>
        </form>

        <Carousel {...this.state} />
      </div>
    );
  }
}

export default App;
