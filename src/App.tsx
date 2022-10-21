import { FC, useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

const App: FC = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div
      className="App"
    >
      <h1 data-cy="title" className="App__title">
        {`Carousel with ${images.length} images`}
      </h1>
      <p className="App__description">Buttons:</p>
      <p className="App__description">
        prev - move slider one step back and stop auto rotation
      </p>
      <p className="App__description">
        auto - start auto rotation
      </p>
      <p className="App__description">
        stop - stop auto rotation
      </p>
      <p className="App__description">
        next - move slider one step forward and stop auto rotation
      </p>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinity={false}
      />
      <form className="App__form form">
        <label className="form__label" htmlFor="step">
          Step - slides spinned in window
          <br />
          {`(between 1 and ${images.length})`}
        </label>
        <div className="form__input">
          <input
            type="range"
            id="step"
            name="step"
            value={`${step}`}
            min="1"
            max={`${images.length - 1}`}
            step="1"
            onChange={(e) => setStep(Number(e.currentTarget.value))}
          />
          <span>{step}</span>
        </div>

        <label className="form__label" htmlFor="frameSize">
          Frame size - slides shown in window
          <br />
          {`(between 1 and ${images.length})`}
        </label>
        <div className="form__input">
          <input
            type="range"
            id="frameSize"
            name="frameSize"
            value={`${frameSize}`}
            min="1"
            max={`${images.length}`}
            step="1"
            onChange={(e) => setFrameSize(Number(e.currentTarget.value))}
          />
          <span>{frameSize}</span>
        </div>

        <label className="form__label" htmlFor="itemWidth">
          Item width - width of one slide in window
          <br />
          (between 80px and 250px)
        </label>
        <div className="form__input">
          <input
            type="range"
            id="itemWidth"
            name="itemWidth"
            value={`${itemWidth}`}
            min="80"
            max="250"
            step="10"
            onChange={(e) => setItemWidth(Number(e.currentTarget.value))}
          />
          <span>{`${itemWidth}px`}</span>
        </div>

        <label className="form__label" htmlFor="animationDuration">
          Animation duration - speed of slides changes
          <br />
          (between 500ms and 3000ms)
        </label>
        <div className="form__input">
          <input
            type="range"
            id="animationDuration"
            name="animationDuration"
            value={`${animationDuration}`}
            min="500"
            max="3000"
            step="100"
            onChange={(e) => (
              setAnimationDuration(Number(e.currentTarget.value))
            )}
          />
          <span>{`${animationDuration}ms`}</span>
        </div>
      </form>
    </div>
  );
};

export default App;
