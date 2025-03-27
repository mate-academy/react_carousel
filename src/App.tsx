import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
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
  };

  updateState(key: keyof State, value: number | boolean) {
    this.setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      const key = e.target.name as keyof State;
      let value: number | boolean;

      if (e.target.type === 'checkbox') {
        value = e.target.checked;
      } else {
        value = +e.target.value;
      }

      this.updateState(key, value);
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <>
          <h1 className="App__title" data-cy="title">
            Carousel with {images.length} images
          </h1>
          <form action="" className="controll">
            <label htmlFor="stepId" className="controll__label">
              Step:
              <input
                id="stepId"
                type="number"
                className="controll__input"
                name="step"
                value={step}
                onChange={handleChange}
                min={0}
              />
            </label>

            <label htmlFor="itemId" className="controll__label">
              Item width:
              <input
                id="itemId"
                type="number"
                className="controll__input"
                name="itemWidth"
                value={itemWidth}
                onChange={handleChange}
                min={0}
              />
            </label>

            <label htmlFor="frameId" className="controll__label">
              Frame size:
              <input
                id="frameId"
                type="number"
                className="controll__input"
                name="frameSize"
                value={frameSize}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="duration" className="controll__label">
              Animation Duration:
              <input
                id="duration"
                type="number"
                className="controll__input"
                name="animationDuration"
                value={animationDuration}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="infinity" className="controll__label">
              Infinity:
              <input
                id="infinity"
                type="checkbox"
                className="controll__input"
                name="infinite"
                checked={infinite}
                onChange={handleChange}
              />
            </label>
          </form>
        </>

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
  }
}

export default App;
