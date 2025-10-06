import { useEffect, useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const images: string[] = [
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

interface HandleInputsForm {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

const App = () => {
  useEffect(() => {
    document.title = 'Carousel';
  }, []);

  const [inputsForm, setInputsForm] = useState<HandleInputsForm>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  });

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form action="" className="MyForm">
        <div className="Myform__input">
          <label htmlFor="itemId">Item Width</label>
          <input
            type="number"
            min="1"
            step="1"
            id="itemId"
            placeholder="ItemWidth"
            value={inputsForm.itemWidth}
            onChange={e => {
              setInputsForm(prev => ({
                ...prev,
                itemWidth: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div className="Myform__input">
          <label htmlFor="stepId">Step</label>
          <input
            type="number"
            min="1"
            step="1"
            id="stepId"
            placeholder="Step"
            value={inputsForm.step}
            onChange={e => {
              setInputsForm(prev => ({
                ...prev,
                step: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div className="Myform__input">
          <label htmlFor="animationID">animationDuration</label>
          <input
            type="number"
            min="100"
            step="100"
            id="animationID"
            placeholder="animationDuration"
            value={inputsForm.animationDuration}
            onChange={e => {
              setInputsForm(prev => ({
                ...prev,
                animationDuration: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div className="Myform__input">
          <label htmlFor="frameId">frameSize</label>
          <input
            type="number"
            min="1"
            max="10"
            step="1"
            id="frameId"
            placeholder="frameSize"
            value={inputsForm.frameSize}
            onChange={e => {
              setInputsForm(prev => ({
                ...prev,
                frameSize: Number(e.target.value),
              }));
            }}
          />
        </div>
      </form>

      <div className="App-container">
        <Carousel
          images={images}
          step={inputsForm.step}
          frameSize={inputsForm.frameSize}
          itemWidth={inputsForm.itemWidth}
          animationDuration={inputsForm.animationDuration}
        />
      </div>
    </div>
  );
};

export default App;
