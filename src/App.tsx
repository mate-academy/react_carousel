import React, { useState } from 'react';

import './App.scss';
import { Form } from './components/Form/Form';
import { Carousel } from './components/Carousel/Carousel';

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

export const App: React.FC<{}> = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinity, setInfiity] = useState(false);

  return (
    <div className="app">
      <div className="container">
        <h1 data-cy="title" className="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Form
          imageSize={itemWidth}
          setImageSize={setItemWidth}
          frameSize={frameSize}
          setFrameSize={setFrameSize}
          step={step}
          setStep={setStep}
          animationDuration={animationDuration}
          setAnimationDuration={setAnimationDuration}
          infinity={infinity}
          setInfiity={setInfiity}
        />

        <Carousel
          images={images}
          imageSize={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinity={infinity}
        />
      </div>
    </div>
  );
};

export default App;
