import React, { useState } from 'react';
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
  const [corouselParams, setCorouselParams] = useState({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  function setParams(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setCorouselParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  return (
    <div className="App">
      <h1>{`Carousel with ${images.length} images`}</h1>
      <Carousel
        images={images}
        step={corouselParams.step}
        frameSize={corouselParams.frameSize}
        itemWidth={corouselParams.itemWidth}
        animationDuration={corouselParams.animationDuration}
        infinite={corouselParams.infinite}
        // eslint-disable-next-line
        setParams={setParams}
      />
    </div>
  );
};

export default App;
