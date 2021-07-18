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
    width: 130,
    left: 0,
    numberOfImage: 3,
    step: 1,
    duration: 1,
    infinity: false,
  };

  render() {
    const {
      images,
      width,
      left,
      numberOfImage,
      step,
      duration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>
        <Carousel
          images={images}
          width={width}
          left={left}
          numberOfImage={numberOfImage}
          step={step}
          duration={duration}
          infinity={infinity}
        />
      </div>
    );
  }
}

export default App;
