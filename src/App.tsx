import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';


const App: React.FC = () => {
  const [images] = useState<string[]>([
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

  const [step, setStep] = useState(3);
  const [frame, setFrame] = useState(3);
  const [width, setWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const changeSettingsStep = (newStep: number) => {
    setStep(newStep);
  };

  const changeSettingsFrame = (newFrame: number) => {
    setFrame(newFrame);
  };

  const changeSettingsWidth = (newWidth: number) => {
    setWidth(newWidth);
  };

  const changeSettingsAnimationDuration = (newDuration: number) => {
    setAnimationDuration(newDuration);
  };

  const changeSettingsInfinite = () => {
    setInfinite(!infinite);
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frame}
        animationDuration={animationDuration}
        itemWidth={width}
        infinite={infinite}
        changeSettingsStep={changeSettingsStep}
        changeSettingsFrame={changeSettingsFrame}
        changeSettingsWidth={changeSettingsWidth}
        changeSettingsAnimationDuration={changeSettingsAnimationDuration}
        changeSettingsInfinite={changeSettingsInfinite}
      />
    </div>
  );
};

export default App;
