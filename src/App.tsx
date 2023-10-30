import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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
      <div className="container">
        <div className="list_item">
          <label htmlFor="width" className="label_item">
            Width:
          </label>
          <input
            onChange={(event) => setItemWidth(+event.target.value)}
            type="number"
            className="input_item"
            value={itemWidth}
            id="width"
          />
        </div>
        <div className="list_item">
          <label htmlFor="step" className="label_item">
            Step:
          </label>
          <input
            onChange={(event) => setStep(+event.target.value)}
            type="number"
            className="input_item"
            value={step}
            id="step"
            min={1}
            max={images.length}
          />
        </div>
        <div className="list_item">
          <label htmlFor="frameSize" className="label_item">
            Frame Size:
          </label>
          <input
            onChange={(event) => setFrameSize(+event.target.value)}
            type="number"
            className="input_item"
            value={frameSize}
            id="frameSize"
            min={1}
            max={images.length}
          />
        </div>
        <div className="list_item">
          <label htmlFor="animationDuration" className="label_item">
            Animation Duration:
          </label>
          <input
            onChange={(event) => setAnimationDuration(+event.target.value)}
            type="number"
            className="input_item"
            value={animationDuration}
            id="animationDuration"
          />
        </div>
        <div className="list_item">
          <label htmlFor="infinite" className="label_item">
            Infinite
          </label>
          <input
            onChange={handleCheckboxChange}
            type="checkbox"
            className="input_item"
            checked={isChecked}
            id="1"
            name="infinite"
          />
        </div>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        infinite={isChecked}
        step={step}
        frameSize={frameSize}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
