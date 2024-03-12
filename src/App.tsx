import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : +value;

      this.setState(prevState => ({
        ...prevState,
        [name]: newValue,
      }));
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title' >Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <section className="customize">
          <label className="customize__label">
            Step:
            <input
              id="stepId"
              type="number"
              className="customize__input"
              value={step}
              onChange={handleChange}
              min={0}
              max={images.length}
              name="step"
            />
          </label>

          <label htmlFor="" className="customize__label">
            Capacity:
            <input
              type="number"
              className="customize__input"
              id="capacityId"
              value={frameSize}
              onChange={handleChange}
              min={1}
              max={images.length}
              name="frameSize"
            />
          </label>

          <label htmlFor="" className="customize__label">
            Item Width:
            <input
              type="number"
              className="customize__input"
              value={itemWidth}
              step={10}
              min={30}
              max={200}
              onChange={handleChange}
              name="itemWidth"
            />
          </label>

          <label htmlFor="" className="customize__label">
            Animation Duration:
            <input
              type="number"
              className="customize__input"
              value={animationDuration}
              onChange={handleChange}
              name="animationDuration"
              step={100}
            />
          </label>

          <label htmlFor="" className="customize__label">
            Infinite carousel:
            <input
              type="checkbox"
              className="customize__input"
              checked={infinite}
              name="infinite"
              onChange={handleChange}
            />
          </label>
        </section>
      </div>
    );
  }
}

export default App;
