import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(3);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);
  const [images] = useState<string[]>([
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
  ]);

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number,
  ) => {
    setter(value);
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div className="Options">
        <div className="Options__item">
          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            className="Options__input"
            placeholder="Step"
            type="number"
            min={1}
            value={step}
            onChange={e => handleInputChange(setStep, +e.target.value)}
          />
        </div>

        <div className="Options__item">
          <label htmlFor="frameId">Frame Size</label>
          <input
            id="frameId"
            className="Options__input"
            placeholder="Frame Size"
            type="number"
            min={1}
            value={frameSize}
            onChange={e => handleInputChange(setFrameSize, +e.target.value)}
          />
        </div>

        <div className="Options__item">
          <label htmlFor="itemId">Item Width (px)</label>
          <input
            id="itemId"
            className="Options__input"
            placeholder="Item Width"
            type="number"
            min={130}
            value={itemWidth}
            onChange={e => handleInputChange(setItemWidth, +e.target.value)}
          />
        </div>

        <div className="Options__item">
          <label htmlFor="duration">Animation Duration (ms)</label>
          <input
            id="duration"
            className="Options__input"
            placeholder="Animation Duration"
            type="number"
            min={0}
            step={500}
            value={animationDuration}
            onChange={e =>
              handleInputChange(setAnimationDuration, +e.target.value)
            }
          />
        </div>
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
