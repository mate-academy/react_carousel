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
    infinite: false,
  };

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : parseFloat(value),
    });
  };

  render() {
    const { images, step, itemWidth, frameSize, animationDuration, infinite }
    = this.state;

    return (
      <div className="App">
        <form>
          <label>
            Step of slide:
            <input
              type="number"
              name="step"
              placeHolder="Step"
              value={this.state.step}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Frame size:
            <input
              type="number"
              name="frameSize"
              placeHolder="Frame size"
              value={this.state.frameSize}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Item width:
            <input
              type="number"
              name="itemWidth"
              placeholder="Item width"
              value={this.state.itemWidth}
              onChange={this.handleChange}
            />
          </label>
          <label
            className="checkbox"
          >
            Infinity option
            <input
              type="checkbox"
              name="infinite"
              placeholder="Infinity"
              checked={this.state.infinite}
              onChange={this.handleChange}
            />
          </label>
        </form>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          startLeftPoint={!infinite ? 0 : images.length - step}
          startTranslateX={!infinite ? 0 : itemWidth * step}
        />
      </div>
    );
  }
}

export default App;
