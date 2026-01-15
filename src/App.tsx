import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { ConfigForm } from './components/ConfigForm';

interface Config {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const App: React.FC = () => {
  const [images] = useState<string[]>([
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

  const [config, setConfig] = useState<Config>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setConfig({
      ...config,
      [id]: type === 'checkbox' ? checked : Number(value),
    });
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel images={images} {...config} />

      <ConfigForm config={config} onChange={handleChange} />
    </div>
  );
};

export default App;
