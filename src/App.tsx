import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const App = () => {
  const [carouselOptions, setCarouselOptions] = useState<State>({
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  });

  const { images, itemWidth, frameSize, step, animationDuration, infinite } =
    carouselOptions;

  const handleChangeOption = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setCarouselOptions(prev => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  const handleChangeInfinite = () => {
    setCarouselOptions(prev => ({
      ...prev,
      infinite: !infinite,
    }));
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <form className="form App__form" onSubmit={e => e.preventDefault()}>
        <label className="form__label" htmlFor="itemId">
          Smiles&#39; size:{' '}
          <input
            className="form__input"
            id="itemId"
            name="itemWidth"
            type="number"
            step={1}
            min={50}
            value={itemWidth}
            onChange={handleChangeOption}
          />
        </label>
        <label className="form__label" htmlFor="frameId">
          Smiles on page:{' '}
          <input
            className="form__input"
            id="frameId"
            name="frameSize"
            type="number"
            value={frameSize}
            step={1}
            min={1}
            max={images.length}
            onChange={handleChangeOption}
          />
        </label>
        <label className="form__label" htmlFor="stepId">
          Steps on click:{' '}
          <input
            className="form__input"
            id="stepId"
            name="step"
            type="number"
            value={step}
            step={1}
            min={1}
            max={images.length}
            onChange={handleChangeOption}
          />
        </label>
        <label className="form__label" htmlFor="fnimationDuration">
          Animation duration:{' '}
          <input
            className="form__input"
            id="fnimationDuration"
            name="animationDuration"
            type="number"
            step={1}
            min={300}
            value={animationDuration}
            onChange={handleChangeOption}
          />
        </label>
        <label className="form__label" htmlFor="infinite">
          Infinite:{' '}
          <input
            className="form__input"
            id="infinite"
            type="checkbox"
            onChange={handleChangeInfinite}
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
