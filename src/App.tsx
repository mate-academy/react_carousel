import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
}

class App extends React.Component<{}, State> {
  state = {
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
    frameSize: 3,
    itemWidth: 130,
    step: 3,
    animationDuration: 1000,
    infinity: false,
  };

  updateState = (key: keyof this['state'], value: number | boolean) => {
    this.setState({ [key]: value } as Pick<this['state'], keyof this['state']>);
  };

  render() {
    const { images, frameSize, itemWidth, step, animationDuration, infinity } =
      this.state;
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      this.updateState(
        e.target.name as keyof State,
        Number(e.target.value) || Boolean(e.target.checked),
      );
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form action="" className="form">
          <label htmlFor="stepId" className="form__label">
            Step
            <input
              type="number"
              name="step"
              id="stepId"
              className="form__input"
              value={step}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="itemId" className="form__label">
            Item Width:
            <input
              type="number"
              name="itemWidth"
              id="itemId"
              className="form__input"
              value={itemWidth}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="frameId" className="form__label">
            Frame Size:
            <input
              type="number"
              name="frameSize"
              id="frameId"
              className="form__input"
              value={frameSize}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="animationDuration" className="form__label">
            Animation Duration:
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              className="form__input"
              value={animationDuration}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="infinity" className="form__label">
            Infinity
            <input
              type="checkbox"
              name="infinity"
              id="infinity"
              className="form__input"
              checked={infinity}
              onChange={handleChange}
            />
          </label>
        </form>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinity}
        />
      </div>
    );
  }
}

export default App;
