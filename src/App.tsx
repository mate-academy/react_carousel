import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App = () => {
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

  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">
        Carousel with
        {images.length}
        {' '}
        images
      </h1>

      <form className="App__form">
        <label
          htmlFor="itemId"
          className="App__label"
        >
          Item Width:
          <input
            className="App__input"
            id="itemId"
            type="number"
            name="itemWidth"
            min="100"
            max="400"
            value={itemWidth}
            onChange={(event) => setItemWidth(+event.target.value)}
          />
        </label>

        <label
          htmlFor="frameId"
          className="App__label"
        >
          Frame Size:
          <input
            className="App__input"
            id="frameId"
            type="number"
            min="1"
            max={images.length - 1}
            value={frameSize}
            onChange={(event) => setFrameSize(+event.target.value)}
          />
        </label>

        <label
          htmlFor="stepId"
          className="App__label"
        >
          Step:
          <input
            className="App__input"
            id="stepId"
            type="number"
            min="1"
            max={frameSize}
            value={step}
            onChange={(event) => setStep(+event.target.value)}
          />
        </label>

        <label
          htmlFor="animationId"
          className="App__label"
        >
          Animation duration
          <input
            className="App__input"
            id="animationId"
            type="number"
            min="100"
            max="5000"
            step="100"
            value={animationDuration}
            onChange={(event) => setAnimationDuration(+event.target.value)}
          />
        </label>

        <label className="App__label">
          Infinite
          <input
            className="App__input"
            type="checkbox"
            checked={infinite}
            onChange={() => setInfinite(!infinite)}
          />
        </label>

      </form>
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
