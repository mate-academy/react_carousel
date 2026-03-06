import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import CarouselControls from './components/CarouselControls';

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

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

      <CarouselControls
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        onItemWidthChange={setItemWidth}
        onFrameSizeChange={setFrameSize}
        onStepChange={setStep}
        onAnimationDurationChange={setAnimationDuration}
      />

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};

export default App;
