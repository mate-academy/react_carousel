import React, { useState, ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import Inputs from './components/Inputs/Inputs';

const imagesLinks = [
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
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'itemWidth':
        setItemWidth(Number(value));
        break;
      case 'frameSize':
        setFrameSize(Number(value));
        break;
      case 'step':
        setStep(Number(value));
        break;
      case 'animationDuration':
        setAnimationDuration(Number(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {imagesLinks.length} images</h1>

      <Inputs
        images={imagesLinks}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        setChange={handleInputChange}
      />

      <Carousel
        images={imagesLinks}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
