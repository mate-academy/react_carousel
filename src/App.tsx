import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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
]

enum DefaultValues {
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animDur = 1000,
}

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(DefaultValues.itemWidth);
  const [frameSize, setFrameSize] = useState(DefaultValues.frameSize);
  const [step, setStep] = useState(DefaultValues.step);
  const [animDur, setAnimDur] = useState(DefaultValues.animDur);
  const [infinite, setInfinite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="App">
      <h1 data-cy="title" className="App__title">Carousel with {images.length} images</h1>
      <div className="App__fields">
        <label htmlFor="itemId" className="App__label">
          {'Item Width: '}
          <input
            type="number"
            id="item"
            className="inpt"
            value={itemWidth}
            min={70}
            max={260}
            step={10}
            onChange={(event) => {
              setItemWidth(+event.target.value);
              setCurrentImage(0);
            }}
          />
        </label>

        <label htmlFor="frameId" className="App__label">
          {'Frame size: '}
          <input
            type="number"
            id="frame"
            className="inpt"
            value={frameSize}
            min={1}
            max={images.length}
            step={1}
            onChange={(event) => {
              setFrameSize(+event.target.value);
              setCurrentImage(0);
            }}
          />
        </label>

        <label htmlFor="stepId" className="App__label">
          {'Step: '}
          <input
            type="number"
            id="step"
            className="inpt"
            value={step}
            min={1}
            max={frameSize}
            step={1}
            onChange={(event) => {
              setStep(+event.target.value);
              setCurrentImage(0);
            }}
          />
        </label>

        <label htmlFor="animDurId" className="App__label">
          {'Animation Duration: '}
          <input
            type="number"
            id="animDur"
            className="inpt"
            value={animDur}
            min={500}
            max={3000}
            step={250}
            onChange={(event) => {
              setAnimDur(+event.target.value);
              setCurrentImage(0);
            }}
          />
        </label>

        <label htmlFor="infiniteId" className="App__label">
          Infinite
          <input
            type="checkbox"
            id="infinite"
            className="switcher"
            onChange={() => setInfinite(!infinite)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={step}
        animDur={animDur}
        frameSize={frameSize}
        itemWidth={itemWidth}
        infinite={infinite}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </div>
  );
}

export default App;
