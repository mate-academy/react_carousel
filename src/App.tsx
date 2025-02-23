import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './types/State';

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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      text: keyof State,
    ) => {
      const value =
        event.target.type === 'checkbox'
          ? event.target.checked
          : +event.target.value;

      this.setState(prev => ({
        ...prev,
        [text]: value,
      }));
    };

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="inputs_box">
          <label htmlFor="stepId" className="input_label">
            Step:{' '}
            <input
              name="step"
              id="stepId"
              type="number"
              min={1}
              max={images.length}
              value={step}
              onChange={ev => handleChange(ev, 'step')}
            />
          </label>
          <label htmlFor="frameId" className="input_label">
            Frame Size:{' '}
            <input
              name="frameSize"
              id="frameId"
              type="number"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={ev => handleChange(ev, 'frameSize')}
            />
          </label>
          <label htmlFor="itemId" className="input_label">
            Item Width:{' '}
            <input
              name="itemWidth"
              id="itemId"
              type="number"
              min={50}
              max={300}
              value={itemWidth}
              onChange={ev => handleChange(ev, 'itemWidth')}
            />
          </label>
          <label htmlFor="animationId" className="input_label">
            Animation Duration:{' '}
            <input
              name="animationDuration"
              id="animationId"
              type="number"
              min={0}
              max={3000}
              step={100}
              value={animationDuration}
              onChange={ev => handleChange(ev, 'animationDuration')}
            />
          </label>
          <label htmlFor="infiniteId" className="input_label">
            Infinite:{' '}
            <input
              name="infinite"
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={ev => handleChange(ev, 'infinite')}
            />
          </label>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
