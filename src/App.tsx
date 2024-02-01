import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Form } from './components/Form';

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
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animation, setAnimation] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App section">
      {/* eslint-disable-next-line */}
      <h1 data-cy='title' className="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animation}
        infinite={infinite}
      />
      <Form
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animation}
        infinite={infinite}
        setStep={(value) => setStep(value)}
        setFrameSize={(value) => setFrameSize(value)}
        setItemWidth={(value) => setItemWidth(value)}
        setAnimation={(value) => setAnimation(value)}
        setInfinite={(value) => setInfinite(value)}
      />
    </div>
  );
};
