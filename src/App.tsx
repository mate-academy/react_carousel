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
  const [sizeImages, setSizeImages] = useState(130);
  const [step, setStep] = useState(1);
  const [frameSize, setFrameSize] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [isInfinite, setIsInfinite] = useState(false);

  return (
    <div className="App">
      <h1>{`Carousel with ${images.length} images`}</h1>

      <div className="App__inputs">
        <label>
          Size images, px
          <input
            type="number"
            value={sizeImages}
            min={10}
            max={200}
            onChange={(event) => setSizeImages(+event.target.value)}
          />
        </label>

        <label>
          Step per images
          <input
            type="number"
            value={step}
            min={1}
            max={10}
            onChange={(event) => setStep(+event.target.value)}
          />
        </label>

        <label>
          Frame size
          <input
            type="number"
            value={frameSize}
            min={1}
            max={10}
            onChange={(event) => setFrameSize(+event.target.value)}
          />
        </label>

        <label>
          Anumation, ms
          <input
            type="number"
            value={animationDuration}
            min={500}
            max={3000}
            onChange={(event) => setAnimationDuration(+event.target.value)}
          />
        </label>

        <label>
          Infinite:
          <input
            type="checkbox"
            checked={isInfinite}
            onChange={(event) => setIsInfinite(!!event.target.checked)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={sizeImages}
        animationDuration={animationDuration}
        infinite={isInfinite}
      />
    </div>
  );
};

export default App;
