import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { CarouselType } from './types/CarouselType';

type State = CarouselType;

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
    step: 1,
    itemWidth: 130,
    frameSize: 3,
    animationDuration: 3000,
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <Carousel {...this.state} />

        <h1 className="App__title">
          {'Carousel with '}
          {images.length}
          {' images'}
        </h1>
      </div>
    );
  }
}

export default App;
