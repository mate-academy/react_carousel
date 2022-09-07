/* eslint-disable */
import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = string[];

const App: React.FC = () => {
  const [images] = useState<State>([
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
  const [step, setStep] = useState(3);
  const [tempStep, setTempStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [tempFrameSize, setTempFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [tempItemWidth, setTempItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [tempAnimationDuration, setTempAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />

      <form
        className="controllers"
        onSubmit={(event) => {
          event.preventDefault();
          setAnimationDuration(tempAnimationDuration);
          setItemWidth(tempItemWidth);
          setStep(tempStep);
          setFrameSize(tempFrameSize);
        }}
      >
        <div className="controllers__item">
          Item width{" "}
          <input
            type="number"
            name="itemWidth"
            value={tempItemWidth}
            onChange={(event) => setTempItemWidth(+event.target.value)}
          />
        </div>

        <div className="controllers__item">
          Frame size{" "}
          <input
            type="number"
            name="frameSize"
            value={tempFrameSize}
            onChange={(event) => setTempFrameSize(+event.target.value)}
          />
        </div>

        <div className="controllers__item">
          Step{" "}
          <input
            type="number"
            name="step"
            value={tempStep}
            onChange={(event) => setTempStep(+event.target.value)}
          />
        </div>

        <div className="controllers__item">
          Animation duration{" "}
          <input
            type="number"
            name="animationDuration"
            value={tempAnimationDuration}
            onChange={(event) => setTempAnimationDuration(+event.target.value)}
          />
        </div>

        <div className="controllers__item">
          <button type="submit">Apply</button>
        </div>
      </form>
    </div>
  );
};

export default App;
