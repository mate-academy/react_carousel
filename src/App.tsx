/* eslint-disable import/no-named-as-default */
import { useState } from 'react';
import { imagesFromApi } from './api/api';
import './App.scss';
import { Carousel } from './components/Carousel';

export const App = () => {
  const [images] = useState(imagesFromApi);
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animation, setAnimation] = useState(1000);
  const [isInfinite, setIstInfinite] = useState(false);

  return (
    <div className="App">
      <h1>{`Carousel with ${images.length} images`}</h1>

      <form method="get" className="App__form">
        <label htmlFor="step" className="App__item">
          Step:
          <input
            type="number"
            min={1}
            max={10}
            value={step}
            id="step"
            className="form__item"
            onChange={(event) => setStep(+event.target.value)}
          />
        </label>

        <label htmlFor="frameSize" className="App__item">
          Frame size:
          <input
            type="number"
            min={1}
            max={10}
            id="frameSize"
            className="form__item"
            value={frameSize}
            onChange={(event) => setFrameSize(+event.target.value)}
          />
        </label>

        <label htmlFor="itemWidth" className="App__item">
          Item with:
          <input
            type="number"
            min={50}
            max={300}
            id="itemWidth"
            className="form__item"
            value={itemWidth}
            onChange={(event) => setItemWidth(+event.target.value)}
          />
        </label>

        <label htmlFor="animationDuration" className="App__item">
          Animation duration:
          <input
            type="number"
            min={100}
            max={4000}
            step={100}
            id="animationDuration"
            className="form__item"
            value={animation}
            onChange={(event) => setAnimation(+event.target.value)}
          />
        </label>

        <label htmlFor="infinite" className="App__item">
          Infinite:
          <input
            type="checkbox"
            id="infinite"
            checked={isInfinite}
            onChange={(event) => setIstInfinite(event.target.checked)}
          />
        </label>
      </form>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animation}
        infinite={isInfinite}
      />
    </div>
  );
};
