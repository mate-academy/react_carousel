import { ChangeEvent, useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface Parameters {
  frameSize: number;
  infinite: boolean;
  step: number;
  itemWidth: number;
  animationDuration: number;
}
const images: string[] = [
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

function App() {
  const [parameters, setParameters] = useState<Parameters>({
    frameSize: 3,
    infinite: false,
    step: 3,
    itemWidth: 130,
    animationDuration: 1000,
  });

  function handleParameters(e: ChangeEvent<HTMLInputElement>) {
    const field = e.target.name;

    setParameters(prev => ({
      ...prev,
      [field]:
        field === 'infinite' ? e.target.checked : parseInt(e.target.value),
    }));
  }

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        frameSize={parameters.frameSize}
        infinite={parameters.infinite}
        step={parameters.step}
        itemWidth={parameters.itemWidth}
        animationDuration={parameters.animationDuration}
      />

      <div className='parameters'>
        <label htmlFor="itemId">
          Image size
          <input
            type="number"
            id="itemId"
            name="itemWidth"
            onChange={handleParameters}
          />
        </label>

        <label htmlFor="stepId">
          Step
          <input
            type="number"
            id="stepId"
            name="step"
            onChange={handleParameters}
          />
        </label>

        <label htmlFor="frameId">
          Frame Size
          <input
            type="number"
            id="frameId"
            name="frameSize"
            onChange={handleParameters}
          />
        </label>

        <label>
          Animation dureation
          <input
            type="number"
            name="animationDuration"
            onChange={handleParameters}
          />
        </label>

      <label>
        Infinite
        <input
          type="checkbox"
          name="infinite"
          checked={parameters.infinite}
          onChange={handleParameters}
        />
      </label>
      </div>
    </div>
  );
}

export default App;
