import { useState } from 'react';
import './App.scss';
import './styles/button.scss';
import './styles/label.scss';
import './styles/input.scss';
import './styles/container.scss';
import './styles/normalize.scss';
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

const App = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handlerPrevClick = () => {
    if (infinite && currentImage === 0) {
      return setCurrentImage(images.length - frameSize);
    }

    return setCurrentImage((value) => (value - step >= 0 ? value - step : 0));
  };

  const handlerNextClick = () => {
    if (infinite && currentImage === images.length - frameSize) {
      return setCurrentImage(0);
    }

    return setCurrentImage((value) => (
      (value + step <= images.length - frameSize)
        ? value + step
        : images.length - frameSize
    ));
  };

  return (
    <div className="App">
      <h1 className="App__title">
        {`Carousel with
        ${images.length}
        images`}
      </h1>
      <div className="App__wrapper">
        <input
          type="number"
          id="itemWidthId"
          min={70}
          max={260}
          step={5}
          value={itemWidth}
          onChange={(e) => setItemWidth(+e.target.value)}
        />
        <label htmlFor="itemWidthId" className="App__label">
          <strong>ITEM WIDTH</strong>
        </label>
        <input
          type="number"
          id="frameSize"
          min={1}
          max={10}
          step={1}
          value={frameSize}
          onChange={(e) => setFrameSize(+e.target.value)}
        />
        <label htmlFor="frameSize" className="App__label">
          <strong>FRAME SIZE</strong>
        </label>
        <input
          type="number"
          id="step"
          min={1}
          max={3}
          value={step}
          onChange={(e) => setStep(+e.target.value)}
        />
        <label htmlFor="step" className="App__label">
          <strong>STEP</strong>
        </label>
        <input
          type="number"
          id="animationDuration"
          min={0}
          max={5000}
          step={500}
          value={animationDuration}
          onChange={(e) => setAnimationDuration(+e.target.value)}
        />
        <label htmlFor="animationDuration" className="App__label">
          <strong>ANIMATION DURATION</strong>
        </label>
        <input
          type="checkbox"
          className="App__checkbox"
          id="infiniteId"
          onClick={() => setInfinite(!infinite)}
        />
        <label htmlFor="infiniteId" className="App__label">
          <strong>INFINITE</strong>
        </label>
        <div className="container">
          <Carousel
            images={images}
            itemWidth={itemWidth}
            frameSize={frameSize}
            animationDuration={animationDuration}
            currentImage={currentImage}
          />
        </div>
        <div className="App__wrapper-button">
          <button
            className="custom-btn style-01"
            onClick={handlerPrevClick}
            type="button"
            disabled={currentImage === 0 && !infinite}
          >
            <span>Prev</span>
          </button>
          <button
            className="custom-btn style-01"
            onClick={handlerNextClick}
            type="button"
            disabled={currentImage === images.length - frameSize && !infinite}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
