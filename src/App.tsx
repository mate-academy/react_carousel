import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => (
      {
        ...state,
        [event.target.name]: +event.target.value,
      }));
  };

  handleChangeInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => (
      {
        ...state,
        [event.target.name]: event.target.checked,
      }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="form">
          <label htmlFor="itemId">
            <input
              type="number"
              min={0}
              id="itemId"
              value={itemWidth}
              name="itemWidth"
              onChange={(event) => (
                this.handleChange(event)
              )}
            />
            <span>slide width in px</span>
          </label>

          <label htmlFor="frameId">
            <input
              value={frameSize}
              type="number"
              min={1}
              id="frameId"
              name="frameSize"
              onChange={(event) => (
                this.handleChange(event)
              )}
            />
            <span>slide frame Size</span>
          </label>

          <label htmlFor="stepId">
            <input
              value={step}
              type="number"
              min={1}
              id="stepId"
              name="step"
              onChange={(event) => (
                this.handleChange(event)
              )}
            />
            <span>slide step</span>
          </label>

          <label htmlFor="animationId">
            <input
              value={animationDuration}
              name="animationDuration"
              type="number"
              min={0}
              id="animationId"
              onChange={(event) => (
                this.handleChange(event)
              )}
            />
            <span>slide animation time</span>
          </label>

          <label htmlFor="infinite">
            <input
              type="checkbox"
              name="infinite"
              defaultChecked={false}
              id="infinite"
              onChange={(event) => (
                this.handleChangeInfinite(event)
              )}
            />
            <span>infinite slides</span>
          </label>

        </div>
      </div>
    );
  }
}

export default App;
