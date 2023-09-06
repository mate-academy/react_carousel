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

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: checked,
      };
    });
  };

  handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newValue = +value;

    if (name === 'frameSize' || name === 'step' || name === 'itemWidth') {
      const { min, max } = event.target;

      newValue = Math.max(+min, Math.min(+max, +value));
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: parseInt(String(newValue), 10),
      };
    });
  };

  render() {
    const {
      images, itemWidth, frameSize, step, animationDuration, infinite,
    }
      = this.state;

    return (
      <div className="app">
        <div>
          <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

          <div className="inputs">
            <label htmlFor="itemWidth">
              Item width:
              <input
                type="number"
                id="itemWidth"
                name="itemWidth"
                value={itemWidth}
                onChange={this.handleNumberChange}
                min={130}
                max={1000}
              />
            </label>

            <label htmlFor="frameSize">
              Frame size:
              <input
                type="number"
                id="frameSize"
                name="frameSize"
                value={frameSize}
                onChange={this.handleNumberChange}
                min={1}
                max={images.length}
              />
            </label>

            <label htmlFor="step">
              Step:
              <input
                type="number"
                id="step"
                name="step"
                value={step}
                onChange={this.handleNumberChange}
                min={1}
                max={images.length}
              />
            </label>

            <label htmlFor="animationDuration">
              Animation duration:
              <input
                type="number"
                id="animationDuration"
                name="animationDuration"
                value={animationDuration}
                onChange={this.handleNumberChange}
              />
            </label>

            <label htmlFor="infinite">
              Infinite:
              <input
                type="checkbox"
                id="infinite"
                name="infinite"
                checked={infinite}
                onChange={this.handleCheckboxChange}
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
      </div>
    );
  }
}

export default App;
