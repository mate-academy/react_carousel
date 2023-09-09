import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
}

const App: React.FC = () => {
  const initialState: State = {
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

  const { images } = initialState;
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="App">
      <h1 data-cy="title" className="App__title">
        {`Carousel with ${images.length} images`}
      </h1>
      <div className="block">
        <div className="block__element">
          <label htmlFor="Width" className="block__label">
            Item Width:
          </label>
          <input
            onChange={(event) => {
              setItemWidth(+event.target.value);
            }}
            value={itemWidth}
            type="number"
            id="Width"
            className="block__input"
          />
        </div>
        <div className="block__element">
          <label htmlFor="Size" className="block__label">
            Frame Size:
          </label>
          <input
            onChange={(event) => {
              setFrameSize(+event.target.value);
            }}
            value={frameSize}
            type="number"
            id="Size"
            className="block__input"
            min={1}
            max={images.length}
          />
        </div>
        <div className="block__element">
          <label htmlFor="Step" className="block__label">
            Step:
          </label>
          <input
            onChange={(event) => {
              setStep(+event.target.value);
            }}
            value={step}
            type="number"
            id="Step"
            className="block__input"
            min={1}
            max={images.length}
          />
        </div>
        <div className="block__element">
          <label htmlFor="Animation" className="block__label">
            Animation Duration:
          </label>
          <input
            onChange={(event) => {
              setAnimationDuration(+event.target.value);
            }}
            value={animationDuration}
            type="number"
            id="Animation"
            className="block__input"
          />
        </div>
        <div className="block__checkbox">
          <label htmlFor="infinite">Infinite</label>
          <input
            checked={isChecked}
            onChange={handleCheckboxChange}
            type="checkbox"
            name="Infinite"
            id="1"
          />
        </div>
      </div>
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={isChecked}
      />
    </div>
  );
};

export default App;
