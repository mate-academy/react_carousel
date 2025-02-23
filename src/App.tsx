import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);
  const [images] = useState([
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

  const maxItemWidth = 500;
  const maxFrameSize = 10;
  const maxStep = 10;
  const maxAnimationDuration = 5000;

  return (
    <div className="App">
      <h1 data-cy="title" className="Title">
        Carousel with {images.length} images
      </h1>
      <div className="Inputs">
        <div className="Inputs__item">
          <label htmlFor="itemId">Item Width:</label>
          <input
            type="number"
            id="itemId"
            className="Inputs__input"
            value={itemWidth}
            min={130}
            max={maxItemWidth}
            onChange={e =>
              setItemWidth(Math.min(Number(e.target.value), maxItemWidth))
            }
          />
        </div>

        <div className="Inputs__item">
          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            className="Inputs__input"
            type="number"
            min={1}
            max={maxFrameSize}
            value={frameSize}
            onChange={e =>
              setFrameSize(Math.min(Number(e.target.value), maxFrameSize))
            }
          />
        </div>

        <div className="Inputs__item">
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            className="Inputs__input"
            type="number"
            value={step}
            min={1}
            max={maxStep}
            onChange={e => setStep(Math.min(Number(e.target.value), maxStep))}
          />
        </div>

        <div className="Inputs__item">
          <label htmlFor="duration">Animation Duration:</label>
          <input
            id="duration"
            className="Inputs__input"
            type="number"
            min={0}
            max={maxAnimationDuration}
            step={500}
            value={animationDuration}
            onChange={e =>
              setAnimationDuration(
                Math.min(Number(e.target.value), maxAnimationDuration),
              )
            }
          />
        </div>

        <div className="Inputs__item Inputs__item--infinite">
          <label htmlFor="infinite">
            Infinite:
            <input
              id="infinite"
              className="Inputs__input Inputs__input--infinite"
              type="checkbox"
              checked={infinite}
              onChange={e => setInfinite(e.target.checked)}
            />
          </label>
        </div>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
