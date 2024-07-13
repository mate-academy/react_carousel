import React, { useState } from 'react';
import './App.scss';
import { SliderForm } from './components/SliderForm';
import Carousel from './components/Carousel';
import { Options } from './types/Options';

const App: React.FC = () => {
  const [options, setOptions] = useState<Options>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite } = options;

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
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <SliderForm data={options} setData={setOptions} />

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
