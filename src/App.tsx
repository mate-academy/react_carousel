import { useState } from 'react';

import './App.scss';
import Carousel from './components/Carousel';
import { CarouselSettings } from './components/CarouselSettings';
import { CarouselContext } from './Context/CarouselContext';

const App = () => {
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
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <CarouselContext.Provider
      value={{
        itemWidth,
        setItemWidth,
        frameSize,
        setFrameSize,
        step,
        setStep,
        animationDuration,
        setAnimationDuration,
        infinite,
        setInfinite,
      }}
    >
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="title">
          Carousel with {images.length} images
        </h1>
        <CarouselSettings />
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    </CarouselContext.Provider>
  );
};

export default App;
