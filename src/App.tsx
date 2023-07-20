import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export const App: React.FC = () => {
  const imagesData: string[] = [
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
  const [translate, setTranslate] = useState(0);

  const getNewItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (itemWidth !== +value) {
      setItemWidth(+value);

      const newTranslate = translate + (step * itemWidth - translate);

      setTranslate(newTranslate);
    }
  };

  const getNewFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (frameSize !== +value) {
      setFrameSize(+value);
    }
  };

  const getNewStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (step !== +value) {
      setStep(+value);
    }
  };

  const getNewAD = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (animationDuration !== +value) {
      setAnimationDuration(+value);
    }
  };

  const getNewInfinte = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked) {
      setInfinite(true);
    } else {
      setInfinite(false);
    }
  };

  return (
    <div className="App" data-cy="title">
      <h1>
        Carousel with
        {' '}
        {imagesData.length}
        {' '}
        images
      </h1>
      <Carousel
        images={imagesData}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
        translate={translate}
        onTranslate={setTranslate}
      />

      <div className="App__setting">
        <label htmlFor="itemWidth" className="App__label">
          Item width:
          <input
            className="App__input"
            id="itemWidth"
            type="number"
            min={30}
            max={400}
            value={itemWidth}
            onChange={getNewItemWidth}
          />
        </label>

        <label htmlFor="frameSize" className="App__label">
          Frame size:
          <input
            className="App__input"
            id="frameSize"
            type="number"
            min={1}
            max={10}
            value={frameSize}
            onChange={getNewFrameSize}
          />
        </label>

        <label htmlFor="step" className="App__label">
          Step:
          <input
            className="App__input"
            id="step"
            type="number"
            min={1}
            max={10}
            value={step}
            onChange={getNewStep}
          />
        </label>

        <label htmlFor="animationDuration" className="App__label">
          Animation duration:
          <input
            className="App__input"
            id="animationDuration"
            type="number"
            min={250}
            max={5000}
            step={250}
            value={animationDuration}
            onChange={getNewAD}
          />
        </label>

        <label htmlFor="infinite" className="App__label">
          Infinite:
          <input
            className="App__input  App__input--checkbox"
            id="infinite"
            type="checkbox"
            checked={infinite}
            onChange={getNewInfinte}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
