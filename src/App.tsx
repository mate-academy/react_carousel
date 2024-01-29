import { useState } from 'react';
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

export const App = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [imgOnPage, setImgOnPage] = useState(3);
  const [imgForChange, setImgForChange] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  function handleChangeWidth(query: React.ChangeEvent<HTMLInputElement>) {
    setItemWidth(+query.target.value);
  }

  function handleChangeFrame(qty: React.ChangeEvent<HTMLInputElement>) {
    setImgOnPage(+(qty.target.value));
  }

  function handleChangeStep(step: React.ChangeEvent<HTMLInputElement>) {
    setImgForChange(+(step.target.value));
  }

  function handleAnimationChange(time: React.ChangeEvent<HTMLInputElement>) {
    setAnimationDuration(+(time.target.value));
  }

  return (
    <div className="App">
      <h1 className="App__header" data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <form className="App__form" action="#" method="post">
        <label className="App__label">
          Width:
          <input
            type="number"
            min="50"
            max="300"
            step="10"
            id="timer1"
            className="App__input"
            name="itemWidth"
            value={String(itemWidth)}
            onChange={handleChangeWidth}
          />
        </label>

        <label className="App__label">
          On page:
          <input
            type="number"
            min="3"
            max="10"
            id="timer2"
            className="App__input"
            name="frameSize"
            value={String(imgOnPage)}
            onChange={handleChangeFrame}
          />
        </label>

        <label className="App__label">
          Step:
          <input
            type="number"
            min="1"
            max="10"
            id="timer3"
            className="App__input"
            name="step"
            value={String(imgForChange)}
            onChange={handleChangeStep}
          />
        </label>

        <label className="App__label">
          Animation speed:
          <input
            type="number"
            min="0"
            max="10000"
            step="100"
            id="timer4"
            className="App__input"
            name="animationDuration"
            value={String(animationDuration)}
            onChange={handleAnimationChange}
          />
        </label>

        <label className="App__label">
          Infinite:
          <input
            type="checkbox"
            className="App__checkbox"
            name="infinite"
            onChange={() => setInfinite(!infinite)}
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={imgOnPage}
        step={imgForChange}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};
