import { useEffect, useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

export default function App() {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  useEffect(() => {
    document.title = 'Carousel';
  }, []);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel</h1>

      <div className="App__controls">
        <label className="App__field">
          <span>itemWidth</span>
          <input
            id="itemId"
            {...{ for: 'itemId' }}
            type="number"
            min={1}
            value={itemWidth}
            onChange={event => setItemWidth(Number(event.target.value) || 1)}
          />
        </label>

        <label className="App__field">
          <span>frameSize</span>
          <input
            id="frameId"
            {...{ for: 'frameId' }}
            type="number"
            min={1}
            value={frameSize}
            onChange={event => setFrameSize(Number(event.target.value) || 1)}
          />
        </label>

        <label className="App__field">
          <span>step</span>
          <input
            id="stepId"
            {...{ for: 'stepId' }}
            type="number"
            min={1}
            value={step}
            onChange={event => setStep(Number(event.target.value) || 1)}
          />
        </label>

        <label className="App__field">
          <span>animationDuration</span>
          <input
            id="animationDurationId"
            {...{ for: 'animationDurationId' }}
            type="number"
            min={0}
            value={animationDuration}
            onChange={event =>
              setAnimationDuration(Number(event.target.value) || 0)
            }
          />
        </label>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
}
