import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { images } from './images';

export const App = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1
        className="App__title"
        data-cy="title"
      >
        {`Carousel with ${images.length} images`}
      </h1>

      <div className="App__labels">
        <label>
          Step:
          <input
            type="number"
            min={1}
            max={10}
            value={step}
            onChange={(e) => setStep(+e.target.value)}
          />
        </label>

        <label>
          Frame size:
          <input
            type="number"
            min={1}
            max={10}
            value={frameSize}
            onChange={(e) => setFrameSize(+e.target.value)}
          />
        </label>

        <label>
          Item width:
          <input
            type="number"
            min={130}
            step={10}
            max={200}
            value={itemWidth}
            onChange={(e) => setItemWidth(+e.target.value)}
          />
        </label>

        <label>
          Animation duration:
          <input
            type="number"
            min={1000}
            max={5000}
            step={1000}
            value={animationDuration}
            onChange={(e) => setAnimationDuration(+e.target.value)}
          />
        </label>

        <label className="infinite">
          Infinite:
          <input
            type="checkbox"
            checked={infinite}
            onChange={(e) => setInfinite(e.target.checked)}
          />
        </label>
      </div>

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
