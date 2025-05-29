import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [images] = useState([
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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1 className="title" data-cy="title">
        Carousel with {images.length} images
      </h1>

      <Header
        itemWidth={itemWidth}
        setItemWidth={setItemWidth}
        frameSize={frameSize}
        setFrameSize={setFrameSize}
        step={step}
        setStep={setStep}
        animationDuration={animationDuration}
        setAnimationDuration={setAnimationDuration}
      />

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
