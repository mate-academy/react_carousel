import React, { useState } from 'react';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const images = Array.from({ length: 10 }, (_, i) => `./img/${i + 1}.png`);

  return (
    <div>
      <h1 data-cy="title">Carousel</h1>

      <label htmlFor="itemId">Item Width:</label>
      <input
        id="itemId"
        type="number"
        value={itemWidth}
        onChange={e => setItemWidth(Number(e.target.value))}
      />

      <label htmlFor="frameId">Frame Size:</label>
      <input
        id="frameId"
        type="number"
        value={frameSize}
        onChange={e => setFrameSize(Number(e.target.value))}
      />

      <label htmlFor="stepId">Step:</label>
      <input
        id="stepId"
        type="number"
        value={step}
        onChange={e => setStep(Number(e.target.value))}
      />

      <label htmlFor="animationId">Animation Duration:</label>
      <input
        id="animationId"
        type="number"
        value={animationDuration}
        onChange={e => setAnimationDuration(Number(e.target.value))}
      />

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
