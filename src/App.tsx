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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <label htmlFor="itemId">Item width</label>
      <input
        value={itemWidth}
        onChange={event => setItemWidth(+event.target.value)}
        type="text"
        id="itemId"
        name="itemId"
      />

      <label htmlFor="frameId">Frame size</label>
      <input
        value={frameSize}
        onChange={event => setFrameSize(+event.target.value)}
        type="text"
        id="frameId"
        name="frameId"
      />

      <label htmlFor="stepId">Step</label>
      <input
        value={step}
        onChange={event => setStep(+event.target.value)}
        type="text"
        id="stepId"
        name="stepId"
      />

      <label htmlFor="animationId">Animation duration</label>
      <input
        value={animationDuration}
        onChange={event => setAnimationDuration(+event.target.value)}
        type="text"
        id="animationId"
        name="animationId"
      />

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
}

export default App;
