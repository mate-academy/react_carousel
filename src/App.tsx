/* eslint-disable import/no-named-as-default */
import { useState } from 'react';
import { imagesFromApi } from './api/api';
import './App.scss';
import { Carousel } from './components/Carousel';

export const App = () => {
  const [images] = useState(imagesFromApi);
  const [step, SetStep] = useState(3);
  const [frameSize, SetFrameSize] = useState(3);
  const [itemWidth, SetItemWidth] = useState(130);
  const [animation, SetAnimation] = useState(1000);
  const [infinite, SetInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1>Carousel with {images.length} images</h1>

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
            onChange={(event) => SetStep(+event.target.value)}
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
            onChange={(event) => SetFrameSize(+event.target.value)}
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
            onChange={(event) => SetItemWidth(+event.target.value)}
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
            onChange={(event) => SetAnimation(+event.target.value)}
          />
        </label>

        <label htmlFor="infinite" className="App__item">
          Infinite:
          <input
            type="checkbox"
            id="infinite"
            checked={infinite}
            onChange={(event) => SetInfinite(event.target.checked)}
          />
        </label>
      </form>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animation}
        infinite={infinite}
      />
    </div>
  );
};
