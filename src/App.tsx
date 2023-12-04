import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { Options } from './components/Options/Options';

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

const initialState = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

const App: React.FC = () => {
  const [state, setState] = useState(initialState);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        {...state}
      />

      <Options
        images={images}
        state={state}
        {...state}
        setState={setState}
      />
    </div>
  );
};

export default App;
