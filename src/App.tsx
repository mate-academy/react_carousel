import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import Control from './components/Control/Control';
import { Setup } from './types/setup';

const App: React.FC = () => {
  const [setup, setSetup] = useState<Setup>({
    images: [
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
    ],
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  });

  const handleInputChange = (
    key: keyof Setup,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = key === 'images'
      ? Array.from(e.target.files || []).map(file => URL.createObjectURL(file))
      : Number(e.target.value);

    setSetup(prevSetup => ({
      ...prevSetup,
      [key]: value,
    }));
  };

  const {
    images, itemWidth, frameSize, step, animationDuration,
  } = setup;

  return (
    <div className="App">
      <h1
        data-cy="title"
        className="title"
      >
        {`Carousel with ${images.length} images`}
      </h1>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />

      <Control
        itemWidth={setup.itemWidth}
        frameSize={setup.frameSize}
        step={setup.step}
        animationDuration={setup.animationDuration}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default App;
