import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export const App: React.FC = () => {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="app">
      <h1 className="title" data-cy="title">{`Carousel with ${images.length} images`}</h1>

      <Carousel
        images={images}
        frameSize={frameSize}
        updateFrameSize={(size) => setFrameSize(size)}
        step={step}
        updateStep={(steps) => setStep(steps)}
        itemWidth={itemWidth}
        updateItemWidth={(width) => setItemWidth(width)}
        animationDuration={animationDuration}
        updateAnimationDuration={(duration) => setAnimationDuration(duration)}
        currentIndex={currentIndex}
        updateCurrentIndex={(index) => setCurrentIndex(index)}
        infinite={infinite}
        updateInfinite={(state) => setInfinite(state)}
      />
    </div>
  );
};
