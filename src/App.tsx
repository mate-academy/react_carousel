import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

// interface State {
//   images: string[];
// }
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

export const App: React.FC = () => {
  const [frameSize, setFrameSize] = useState(3);
  const [imageSize, setImageSize] = useState(130);
  const [stepSize, setStepSize] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1>Carousel with {images.length} images</h1>
      <div className="app__container">
        <label htmlFor="itemId" className="App__label">
          {' '}
          <input
            id="itemId"
            className="App__input--image_width"
            type="text"
            placeholder="step size"
            onChange={e => setStepSize(+e.target.value)}
          />
        </label>

        <label htmlFor="itemId" className="App__label">
          {' '}
          <input
            id="itemId"
            className="App__input--image_width"
            type="text"
            placeholder="frame size"
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>

        <label htmlFor="itemId" className="App__label">
          {' '}
          <input
            id="itemId"
            className="App__input--image_width"
            type="text"
            placeholder="image size"
            onChange={e => setImageSize(+e.target.value)}
          />
        </label>

        <label htmlFor="itemId" className="App__label">
          {' '}
          <input
            id="itemId"
            className="App__input--image_width"
            type="text"
            placeholder="animation duration"
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>
      </div>
      <Carousel
        images={images}
        frameSize={frameSize}
        imageSize={imageSize}
        step={stepSize}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
