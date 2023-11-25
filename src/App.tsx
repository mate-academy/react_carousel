import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { Form } from './components/Form/Form';

const images: string[] = [
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
  const [inputWidth, setInputWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationD, setAnimationD] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">
        Carousel with
        {' '}
        {images.length}
        {' '}
        images
      </h1>

      <Form
        images={images}
        inputWidth={inputWidth}
        setInputWidth={setInputWidth}
        frameSize={frameSize}
        setFrameSize={setFrameSize}
        step={step}
        setStep={setStep}
        animationD={animationD}
        setAnimationD={setAnimationD}
        infinite={infinite}
        setInfinite={setInfinite}
      />

      <Carousel
        images={images}
        inputWidth={inputWidth}
        frameSize={frameSize}
        step={step}
        animationD={animationD}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
