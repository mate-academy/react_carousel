import './App.scss';
import Carousel from './components/Carousel';
import { useState } from 'react';

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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy={'title'}>Carousel with {images.length} images</h1>

      <Carousel
        key={String(infinite)}
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <div className="controls">
        <label htmlFor="itemWidth">
          Item width:
          <input
            type="number"
            id="itemWidth"
            value={itemWidth}
            onChange={event => setItemWidth(+event.target.value)}
          />
        </label>
        <label htmlFor="frameSize">
          Frame size:
          <input
            type="number"
            id="frameSize"
            value={frameSize}
            onChange={event => setFrameSize(+event.target.value)}
          />
        </label>
        <label htmlFor="step">
          Step:
          <input
            type="number"
            id="step"
            value={step}
            onChange={event => setStep(+event.target.value)}
          />
        </label>
        <label htmlFor="animationDuration">
          Animation duration:
          <input
            type="number"
            id="animationDuration"
            value={animationDuration}
            onChange={event => setAnimationDuration(+event.target.value)}
          />
        </label>
        <label htmlFor="infinite">
          Infinite:
          <input
            type="checkbox"
            id="infinite"
            checked={infinite}
            onChange={event => setInfinite(event.target.checked)}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
