import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';

class App extends React.Component {
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
  };

  handleChange = (e) => {
    const { name, value, min, max } = e.target;

    let newValue = +value < +min ? +min : +value;

    newValue = +value > +max ? +max : +value;

    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration,
    } = this.state;

    return (
      <div className="App">
        <form className="App__form">
          <div className="App__form-field">
            <label htmlFor="step">Step</label>
            <input
              type="number"
              id="step"
              name="step"
              value={step}
              min="1"
              max="10"
              onChange={this.handleChange}
            />
          </div>

          <div className="App__form-field">
            <label htmlFor="frameSize">Frame Size</label>
            <input
              type="number"
              id="frameSize"
              name="frameSize"
              value={frameSize}
              min="1"
              max="10"
              onChange={this.handleChange}
            />
          </div>

          <div className="App__form-field">
            <label htmlFor="itemWidth">Item Width</label>
            <input
              type="number"
              id="itemWidth"
              name="itemWidth"
              value={itemWidth}
              min="30"
              max="300"
              onChange={this.handleChange}
            />
          </div>

          <div className="App__form-field">
            <label htmlFor="animationDuration">Animation Duration</label>
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              value={animationDuration}
              min="0"
              max="3000"
              onChange={this.handleChange}
            />
          </div>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          // infinite
        />
      </div>
    );
  }
}

export default App;
