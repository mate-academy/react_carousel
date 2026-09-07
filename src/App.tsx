import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
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

  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <label htmlFor="stepId">
        Step:{' '}
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={changeEvent => setStep(Number(changeEvent.target.value))}
        />
      </label>{' '}
      <label htmlFor="frameId">
        FrameSize:{' '}
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={changeEvent =>
            setFrameSize(Number(changeEvent.target.value))
          }
        />
      </label>{' '}
      <label htmlFor="itemId">
        ItemWidth:{' '}
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={changeEvent =>
            setItemWidth(Number(changeEvent.target.value))
          }
        />
      </label>{' '}
      <label htmlFor="animationId">
        AnimationDuration:{' '}
        <input
          id="animationId"
          type="number"
          value={animationDuration}
          onChange={changeEvent =>
            setAnimationDuration(Number(changeEvent.target.value))
          }
        />
      </label>{' '}
      <label htmlFor="infiniteId">
        Infinite:{' '}
        <input
          id="infiniteId"
          type="checkbox"
          checked={infinite}
          onChange={changeEvent => setInfinite(changeEvent.target.checked)}
        />
      </label>
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

export default App;
