import { useState } from 'react';
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

const App = () => {
  const [slides] = useState(images);

  return (
    <div className="App">
      <h1 data-cy="title">
        Carousel with
        {` ${slides.length} `}
        images
      </h1>

      <Carousel
        images={images}
      />
    </div>
  );
};

export default App;
