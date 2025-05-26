import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

// interface State {
//   images: string[];
// }

export const App: React.FC = () => {
  const state = {
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
  };

  const [imageWidth, setImageWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [currentStep, setCurrentStep] = useState(3);
  const [currentDuration, setCurrentDuration] = useState(1000);
  const [currentPosition, SetCurrentPosition] = useState(0);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className="App__title" data-cy="title">
        Carousel with {state.images.length} images
      </h1>

      <Carousel
        images={state.images}
        imageWidth={imageWidth}
        newImageWidth={setImageWidth}
        frameSize={frameSize}
        newFrameSize={setFrameSize}
        currentStep={currentStep}
        newStep={setCurrentStep}
        animationSpeed={currentDuration}
        newSpeed={setCurrentDuration}
        currentPosition={currentPosition}
        newPosition={SetCurrentPosition}
      />
    </div>
  );
};
