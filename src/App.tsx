import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1 className="title" data-cy="title">
        Carousel with {images.length} images
      </h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <form className="form" action="#" method="post">
        <label htmlFor="itemId" className="form__content">
          Enter Item Width:{' '}
          <input
            id="itemId"
            type="number"
            className="form__input"
            value={itemWidth}
            placeholder="130px"
            min={130}
            max={300}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>
        <label htmlFor="frameId" className="form__content">
          Enter Item Size:{' '}
          <input
            id="frameId"
            type="number"
            className="form__input"
            value={frameSize}
            placeholder="3"
            min={1}
            max={9}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>
        <label htmlFor="stepId" className="form__content">
          Scroll Step:{' '}
          <input
            id="stepId"
            type="number"
            className="form__input"
            value={step}
            placeholder="3"
            min={1}
            max={8}
            onChange={e => setStep(+e.target.value)}
          />
        </label>
        <label htmlFor="animationDuration" className="form__content">
          Enter Item Animation Duration:{' '}
          <input
            id="animationDuration"
            type="number"
            className="form__input"
            value={animationDuration}
            placeholder="1000"
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

export default App;
