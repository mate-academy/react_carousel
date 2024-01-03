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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <label htmlFor="itemId">width</label>
      <input
        type="text"
        id="itemId"
        placeholder={`${itemWidth}`}
        onChange={(event) => setItemWidth(+event.target.value)}
      />
      <label htmlFor="frameId">frame size</label>
      <input
        type="text"
        id="frameId"
        placeholder={`${frameSize}`}
        onChange={(event) => setFrameSize(+event.target.value)}
      />
      <label htmlFor="stepId">step</label>
      <input
        type="text"
        id="stepId"
        placeholder={`${step}`}
        onChange={(event) => setStep(+event.target.value)}
      />
      <label htmlFor="idAnimationDuration">animation duration</label>
      <input
        type="text"
        id="idAnimationDuration"
        placeholder={`${animationDuration}`}
        onChange={(event) => setAnimationDuration(+event.target.value)}
      />

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        // infinite={false}
      />
    </div>
  );
};

export default App;
