import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export const App: React.FC = () => {
  // Używamy useState do przechowywania listy obrazów
  const [images] = useState([
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
  ]);

  return (
    <div className="App">
      <h1>Carousel with {images.length} images</h1>
      {/* Przekazanie images jako props do Carousel */}
      <Carousel images={images} step={3} itemWidth={130} />
    </div>
  );
};

export default App;
