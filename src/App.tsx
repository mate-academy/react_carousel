import { FC, useState } from 'react';
import Carousel from './components/Carousel';

const imgs = [
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

const wordStyle = `bg-gradient-to-r
 from-pink-500
 via-red-500
 to-yellow-500
 text-transparent
 bg-clip-text`;
const boxStyle = 'w-80 border border-gray-300 shadow-xl p-10 rounded-md text-l';

const App: FC = () => {
  const [step, setStep] = useState(3);
  const [size, setSize] = useState(130);
  const [frameSize, setFrameSize] = useState(2);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App flex flex-col justify-center items-center gap-4">
      <h1 className="text-8xl font-extrabold">
        What a
        <span
          className={wordStyle}
        >
          {' nice '}
        </span>
        slider we have
      </h1>
      <Carousel
        images={imgs}
        size={size}
        step={step}
        frameSize={frameSize}
        animationDuration={animationDuration}
      />
      <div className="flex flex-grow-0 justify-center">
        <div
          className={boxStyle}
        >
          <label htmlFor="animation">
            {`Frame size is ${frameSize}`}
          </label>
          <input
            type="range"
            className="range"
            min="1"
            max="10"
            value={frameSize}
            onChange={(e) => {
              setFrameSize(Number(e.currentTarget.value));
            }}
          />
          <label htmlFor="step">
            {`Step is ${step}`}
          </label>
          <input
            type="range"
            id="step"
            className="range"
            min="1"
            max="5"
            value={step}
            onChange={(e) => setStep(Number(e.currentTarget.value))}
          />
          <label htmlFor="size">
            {`Size is ${size}px`}
          </label>
          <input
            type="range"
            id="size"
            className="range"
            min="130"
            max="300"
            value={size}
            onChange={(e) => {
              setSize(Number(e.currentTarget.value));
            }}
          />
          <label htmlFor="animation">
            {`Animation duration is ${animationDuration / 1000}s`}
          </label>
          <input
            type="range"
            id="animation"
            className="range"
            min="1000"
            max="5000"
            step="1000"
            value={animationDuration}
            onChange={(e) => {
              setAnimationDuration(Number(e.currentTarget.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
