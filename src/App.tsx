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
  const [isInfinite, setIsInfinite] = useState(false);
  const [translate, setTranslate] = useState(0);
  const [slideIndex, SetSlideIndex] = useState(0);

  const maxSlideIndex = imagesData.length - frameSize;

  const getNewSlideIndex = (move: string): void => {
    if (move === 'forward') {
      if (isInfinite && slideIndex === maxSlideIndex) {
        SetSlideIndex(0);

        return;
      }

      if (slideIndex + step >= maxSlideIndex) {
        SetSlideIndex(maxSlideIndex);

        return;
      }

      SetSlideIndex(slideIndex + step);
    }

    if (move === 'back') {
      if (isInfinite && slideIndex === 0) {
        SetSlideIndex(maxSlideIndex);

        return;
      }

      if (slideIndex - step < 0) {
        SetSlideIndex(0);

        return;
      }

      SetSlideIndex(slideIndex - step);
    }
  };

  const getNewItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (itemWidth !== +value) {
      const prevWidth = itemWidth;

      setItemWidth(+value);

      if (translate !== 0) {
        const newTranslate
          = translate + ((+value - prevWidth) * slideIndex);

        setTranslate(newTranslate);
      }
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
      setIsInfinite(true);
    } else {
      setIsInfinite(false);
    }
  };

  return (
    <div className="App" data-cy="title">
      <h1>{`Carousel with ${imagesData.length} images`}</h1>
      <h2>{`Pos:${slideIndex}, maxPos:${maxSlideIndex}`}</h2>
      <Carousel
        images={imagesData}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        isInfinite={isInfinite}
        translate={translate}
        onTranslate={setTranslate}
        onSlideIndex={getNewSlideIndex}
      />

      <div className="App__setting">
        <label htmlFor="itemId" className="App__label">
          Item width:
          <input
            className="App__input"
            id="itemId"
            type="number"
            min={30}
            max={400}
            value={itemWidth}
            onChange={getNewItemWidth}
          />
        </label>

        <label htmlFor="frameId" className="App__label">
          Frame size:
          <input
            className="App__input"
            id="frameId"
            type="number"
            min={1}
            max={10}
            value={frameSize}
            onChange={getNewFrameSize}
          />
        </label>

        <label htmlFor="stepId" className="App__label">
          Step:
          <input
            className="App__input"
            id="stepId"
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

        <label htmlFor="isInfinite" className="App__label">
          Infinite:
          <input
            className="App__input  App__input--checkbox"
            id="isInfinite"
            type="checkbox"
            checked={isInfinite}
            onChange={getNewInfinte}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
