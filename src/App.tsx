import React from 'react';
import './App.scss';
import { CarouselMenu } from './components/CarouselMenu/CarouselMenu';

const imagesFromServer = [
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
      <CarouselMenu images={imagesFromServer} />
    </div>
  );
};

export default App;
