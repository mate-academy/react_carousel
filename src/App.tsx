import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

function App() {
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

  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel</h1>

      <div className="controls">
        <label htmlFor="itemId">
          itemWidth
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>

        <label htmlFor="frameId">
          frameSize
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>

        <label htmlFor="stepId">
          step
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </label>

        <label htmlFor="animationId">
          animationDuration
          <input
            id="animationId"
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        frameSize={frameSize}
        step={step}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
}

export default App;
