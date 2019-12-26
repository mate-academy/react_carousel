import React from 'react';
import './App.css';

import Carousel from './components/Carousel';

const App = () => {
  const images = [
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
  ];

  return (
    <div className="App">
      <h1>
        {`Carousel with ${images.length} images`}
      </h1>
      <Carousel
        images={images}
        step={3}
        frameSize={3}
        itemWidth={130}
        animationDuration={1000}
        infinite
      />
    </div>
  );
};

export default App;
