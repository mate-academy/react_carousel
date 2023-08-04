import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  animationDuration: number,
  infinity: boolean,
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
    infinity: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    const changeState = (param: string, val: string, check: boolean) => {
      if (name === 'infinity') {
        return {
          ...this.state,
          [param]: check,
        };
      }

      return {
        ...this.state,
        [param]: +val,
      };
    };

    this.setState(changeState(name, value, checked));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinity={infinity}
        />

        <div className="App__container">
          <label>
            {'Step: '}
            <input
              min={1}
              max={10}
              name="step"
              value={step}
              type="number"
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            {'Frame size: '}
            <input
              min={1}
              max={images.length}
              name="frameSize"
              value={frameSize}
              type="number"
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            {'Item width: '}
            <input
              min={0}
              max={500}
              name="itemWidth"
              value={itemWidth}
              type="number"
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            {'Animation duration: '}
            <input
              min={0}
              max={3000}
              name="animationDuration"
              value={animationDuration}
              type="number"
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            {'Infinity: '}
            <input
              name="infinity"
              checked={infinity}
              type="checkbox"
              onChange={this.handleInputChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
