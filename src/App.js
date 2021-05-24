import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';
import { CarouselSettings } from './components/CarouselSettings';

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
        <CarouselSettings
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          onChange={this.handleChange}
        />

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
