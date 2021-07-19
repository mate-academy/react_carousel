import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';

const carouselDefaultData = {
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

const App = () => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = carouselDefaultData;

  return (
    <div className="App">
      <h1>Carousel with images</h1>
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
