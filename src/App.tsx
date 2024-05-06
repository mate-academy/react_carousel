import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import Form from './components/Form';

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

export type DefaultInputs = {
  itemWidth: number;
  frameSize: number;
  stepSize: number;
  animationDuration: number;
  infinite: boolean;
};

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [stepSize, setStepSize] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const params: DefaultInputs = {
    itemWidth: itemWidth,
    frameSize: frameSize,
    stepSize: stepSize,
    animationDuration: animationDuration,
    infinite: infinite,
  };

  const handleItemWidth = (width: number) => {
    if (width >= 50 && width < 500) {
      setItemWidth(width);
    } else {
      return;
    }
  };

  const handleFrameSize = (size: number) => {
    if (size >= 1 && size <= 10) {
      setFrameSize(size);
    } else {
      return;
    }
  };

  return (
    <div className="App">
      <h1 data-cy={'title'}>Carousel with {images.length} images</h1>
      <div className="App__container">
        <div className="App__form">
          <Form
            stepSize={step => setStepSize(step)}
            frameSize={size => handleFrameSize(size)}
            imageSize={size => handleItemWidth(size)}
            animationDuration={(duration: number) =>
              setAnimationDuration(duration)
            }
            infinite={result => setInfinite(result)}
            params={params}
          />
        </div>
      </div>
      <Carousel
        images={images}
        step={stepSize}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
