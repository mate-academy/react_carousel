import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type VisibleImages = string[];

const images: VisibleImages = [
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

const App = () => {
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [imageWidth, setImageWidth] = useState(130);
  const [animationDuration, setAnimtainDuration] = useState(1000);
  const [isInfinite, setIsInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title" className="App__title">
        Carousel with {images.length} images
      </h1>
      <div className="App__inputContainer">
        <label htmlFor="itemId" className="App__label">
          {' '}
          <input
            id="itemId"
            className="App__input--image_width"
            type="text"
            placeholder="image width"
            onChange={e => setImageWidth(Number(e.target.value))}
          />
        </label>
        <label htmlFor="frameId" className="App__label">
          {' '}
          <input
            id="frameId"
            className="App__input--frame_size"
            type="text"
            placeholder="framesize"
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>
        <label htmlFor="stepId" className="App__label">
          {' '}
          <input
            id="stepId"
            className="App__input--step"
            type="text"
            placeholder="step"
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>

        <label htmlFor="durationId" className="App__label">
          {' '}
          <input
            id="durationId"
            className="App__input--duration"
            type="text"
            placeholder="animation duration"
            onChange={e => setAnimtainDuration(Number(e.target.value))}
          />
        </label>
        <label className="App__checkbox-label">
          <input
            className="App__input--checkbox"
            type="checkbox"
            checked={isInfinite}
            onChange={event => setIsInfinite(event.target.checked)}
          />
          Infinite
        </label>
      </div>
      <Carousel
        images={images}
        frameSize={frameSize}
        step={step}
        itemWidth={imageWidth}
        animationDuration={animationDuration}
        isInfinite={isInfinite}
      />
    </div>
  );
};

export default App;
