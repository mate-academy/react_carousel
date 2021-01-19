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

  render() {
    const {
      images,
      animationDuration,
      frameSize,
      itemWidth,
      step,
    } = this.state;

    return (
      <div className="App">
        <h1>
          Carousel with
          {images.length}
          {' '}
          images
        </h1>
        <div className="container">
          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
          />
        </div>

      </div>
    );
  }
}

export default App;
