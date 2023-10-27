import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { CarouselSettings } from './types/CarouselSettings';
import { setObjField } from './utils';

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

export const App: React.FC = () => {
  const [carouselSettings, setCarouselSettings] = useState<CarouselSettings>({
    images,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const [currentImgIndx, setCurrentImgIndx] = useState(0);
  const handleCurrentImgIndx
    = (indx: number): void => {
      if (indx < 0 || indx >= images.length) {
        return;
      }

      setCurrentImgIndx(indx);
    };

  const onChangeItemWidth
    = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newItemWidth = Math.round(+(event.target.value));

      if (newItemWidth < 130 || newItemWidth > 260) {
        return;
      }

      setCarouselSettings(prev => setObjField(
        prev,
        'itemWidth',
        newItemWidth,
      ));
    };

  const onChangeFrameSize
    = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newFrameSize = Math.round(+(event.target.value));

      if (newFrameSize < 0 || newFrameSize > carouselSettings.images.length) {
        return;
      }

      setCarouselSettings(prev => setObjField(
        prev,
        'frameSize',
        newFrameSize,
      ));
    };

  const onChangeStep
    = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newStep = Math.round(+(event.target.value));

      if (newStep < 0 || newStep > carouselSettings.images.length) {
        return;
      }

      setCarouselSettings(prev => setObjField(
        prev,
        'step',
        newStep,
      ));
    };

  const onChangeAnimationDuration
    = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newAnimnDurn = Math.round(+(event.target.value));

      if (newAnimnDurn < 500 || newAnimnDurn > 3000) {
        return;
      }

      setCarouselSettings(prev => setObjField(
        prev,
        'animationDuration',
        newAnimnDurn,
      ));
    };

  const onChangeInfinite = (): void => {
    setCarouselSettings(prev => setObjField(
      prev,
      'infinite',
      !prev.infinite,
    ));
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title" className="App__title">Carousel with {images.length} images</h1>

      <div className="App__inputs">
        <label
          className="App__label"
          htmlFor="itemId"
        >
          Item Width
          <input
            type="number"
            className="App__input"
            name="itemWidth"
            id="itemId"
            min={130}
            max={260}
            value={carouselSettings.itemWidth}
            onChange={onChangeItemWidth}
          />
        </label>

        <label
          className="App__label"
          htmlFor="frameId"
        >
          Frame Size
          <input
            type="number"
            className="App__input"
            name="frameSize"
            id="frameId"
            min={1}
            max={images.length}
            step={1}
            value={carouselSettings.frameSize}
            onChange={onChangeFrameSize}
          />
        </label>

        <label
          className="App__label"
          htmlFor="stepId"
        >
          Step
          <input
            type="number"
            className="App__input"
            name="step"
            id="stepId"
            min={1}
            max={images.length}
            step={1}
            value={carouselSettings.step}
            onChange={onChangeStep}
          />
        </label>

        <label className="App__label">
          Animation Duration
          <input
            type="number"
            className="App__input"
            name="animationDuration"
            id="animationDuration"
            min={500}
            max={3000}
            step={500}
            value={carouselSettings.animationDuration}
            onChange={onChangeAnimationDuration}
          />
        </label>

        <label className="App__label">
          Infinite
          <input
            type="checkbox"
            className="App__input"
            name="infinite"
            id="infinite"
            onChange={onChangeInfinite}
          />
        </label>
      </div>

      <Carousel
        images={carouselSettings.images}
        step={carouselSettings.step}
        frameSize={carouselSettings.frameSize}
        itemWidth={carouselSettings.itemWidth}
        animationDuration={carouselSettings.animationDuration}
        infinite={carouselSettings.infinite}
        currentImgIndx={currentImgIndx}
        handleCurrentImgIndx={handleCurrentImgIndx}
      />
    </div>
  );
};

export default App;
