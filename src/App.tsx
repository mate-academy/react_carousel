import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

const App: React.FC = () => {
  const state: State = {
    images: [
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
    ],
  };

  const { images } = state;
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [sizeImages, setSizeImages] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [inifinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 className="App__title">{`Carousel with ${images.length} images`}</h1>

      <div className="App__container">
        <label>
          Size images in px
          <input
            type="number"
            value={sizeImages}
            min={20}
            max={200}
            onChange={(e) => setSizeImages(+e.target.value)}
          />
        </label>

        <label>
          Set quantity
          <input
            type="number"
            value={frameSize}
            min={1}
            max={10}
            onChange={(e) => setFrameSize(+e.target.value)}
          />
        </label>

        <label>
          Set animation duration
          <input
            type="number"
            value={animationDuration}
            min={300}
            max={10000}
            onChange={(e) => setAnimationDuration(+e.target.value)}
          />
        </label>

        <label>
          Set step per page
          <input
            type="number"
            value={step}
            min={1}
            max={10}
            onChange={(e) => setStep(+e.target.value)}
          />
        </label>

        <label>
          Infinity
          <input
            type="checkbox"
            checked={inifinite}
            onChange={(e) => setInfinite(!!e.target.checked)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={sizeImages}
        animationDuration={animationDuration}
        inifinite={inifinite}
      />
    </div>
  );
};

export default App;
