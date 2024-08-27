import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const itemWidthDefault = 130;
const frameSizeDefault = 3;
const stepDefault = 3;
const animationDurationDefault = 1000;
const infiniteDefault = false;

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

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = React.useState(itemWidthDefault);
  const [frameSize, setFrameSize] = React.useState(frameSizeDefault);
  const [step, setStep] = React.useState(stepDefault);
  const [animationDuration, setAnimationDuration] = React.useState(
    animationDurationDefault,
  );
  const [infinite, setInfinite] = React.useState(infiniteDefault);

  return (
    <div className="App">
      <h1 data-cy="title">
        Carousel{images.length > 0 && ` with ${images.length} images`}
      </h1>

      {images.length > 0 && (
        <>
          <div className="App__inputs">
            <label htmlFor="itemId">Item width</label>
            <input
              type="number"
              name="itemWidth"
              id="itemId"
              value={itemWidth}
              onChange={e => setItemWidth(Number(e.target.value))}
              min={1}
            />
            <br />

            <label htmlFor="frameId">
              Number of images displayed at the same time
            </label>
            <input
              type="number"
              name="frameSize"
              id="frameId"
              value={frameSize}
              onChange={e => setFrameSize(Number(e.target.value))}
              min={1}
              max={images.length - step}
            />
            <br />

            <label htmlFor="stepId">Number of images scrolled per click</label>
            <input
              type="number"
              name="step"
              id="stepId"
              value={step}
              onChange={e => setStep(Number(e.target.value))}
              min={1}
              max={images.length - frameSize}
            />
            <br />

            <label htmlFor="animationDuration">
              Time in ms to show the new portion of images
              <input
                type="number"
                name="animationDuration"
                id="animationDuration"
                value={animationDuration}
                onChange={e => setAnimationDuration(Number(e.target.value))}
                min={1}
              />
            </label>
            <br />

            <div>
              <label htmlFor="infinite">Infite</label>
              <input
                type="checkbox"
                name="infinite"
                id="infinite"
                checked={infinite}
                onChange={() => setInfinite(currentState => !currentState)}
              />
            </div>
          </div>

          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />
        </>
      )}
    </div>
  );
};

export default App;
