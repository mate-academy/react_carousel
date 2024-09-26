import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App = () => {
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
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinity] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form className="form" action="#">
        <div className="field">
          <label className="label" htmlFor="itemId">
            Item Width
          </label>
          <div className="control">
            <input
              id="itemId"
              onChange={e =>
                setItemWidth(+e.target.value > 0 ? +e.target.value : 1)
              }
              value={itemWidth}
              type="number"
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="frameId">
            Frame Size
          </label>
          <div className="control">
            <input
              id="frameId"
              name="frameId"
              min={1}
              onChange={e => setFrameSize(+e.target.value)}
              value={frameSize}
              type="number"
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="stepId">
            Step
          </label>
          <div className="control">
            <input
              id="stepId"
              onChange={e => setStep(+e.target.value > 0 ? +e.target.value : 1)}
              value={step}
              type="number"
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="animationDurationInput">
            Animation Duration
          </label>
          <div className="control">
            <input
              id="animationDurationInput"
              onChange={e =>
                setAnimationDuration(+e.target.value > 0 ? +e.target.value : 1)
              }
              value={animationDuration}
              type="number"
            />
          </div>
        </div>
      </form>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinity}
      />
    </div>
  );
};

export default App;
