import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>
      <Carousel
        images={images}
        itemWidth={130}
        frameSize={3}
        step={3}
        animationDuration={1000}
        infinite={false}
      />
    </div>
  );
};

export default App;
