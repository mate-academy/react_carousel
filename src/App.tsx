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

export const App: React.FC = () => {
  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1> Carousel with {images.length} images</h1>

      <Carousel images={images} />
    </div>
  );
};

export default App;
