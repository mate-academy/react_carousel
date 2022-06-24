import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App = () => {
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

  const [inputedItemWidth, setInputedItemWidth] = useState(130);
  const [inputedFrameSize, setInputedFrameSize] = useState(3);
  const [inputedStep, setInputedStep] = useState(3);
  const [inputedAnimationDuration, setInputedAnimationDuration]
  = useState(1000);

  const [itemWidth, setItemWidth] = useState(inputedItemWidth);
  const [frameSize, setFrameSize] = useState(inputedFrameSize);
  const [step, setStep] = useState(inputedStep);
  const [animationDuration, setAnimationDuration]
  = useState(inputedAnimationDuration);

  const submitForm = () => {
    setItemWidth(inputedItemWidth);
    setFrameSize(inputedFrameSize);
    setStep(inputedStep);
    setAnimationDuration(inputedAnimationDuration);
  };

  return (
    <div className="App">
      <h1>{`Carousel with ${images.length} images`}</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitForm();
        }}
      >
        <div className="form__input">
          <label
            htmlFor="itemWidth"
            className="label"
          >
            Item Width
          </label>
          <input
            type="number"
            min="50"
            max="200"
            id="itemWidth"
            value={inputedItemWidth}
            onChange={(event) => {
              setInputedItemWidth(+event.target.value);
            }}
          />
        </div>

        <div className="form__input">
          <label
            htmlFor="frameSize"
            className="label"
          >
            Frame Size
          </label>
          <input
            type="number"
            id="frameSize"
            min="1"
            max="5"
            value={inputedFrameSize}
            onChange={(event) => {
              setInputedFrameSize(+event.target.value);
            }}
          />
        </div>

        <div className="form__input">
          <label
            htmlFor="step"
            className="label"
          >
            Step
          </label>
          <input
            type="number"
            id="step"
            min="1"
            max={images.length}
            value={inputedStep}
            onChange={(event) => {
              setInputedStep(+event.target.value);
            }}
          />
        </div>

        <div className="form__input">
          <label
            htmlFor="animationDuration"
            className="label"
          >
            Animation duration
          </label>
          <input
            type="number"
            id="animationDuration"
            min="0"
            max="10000"
            value={inputedAnimationDuration}
            onChange={(event) => {
              setInputedAnimationDuration(+event.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="btn"
        >
          Submit
        </button>
      </form>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
