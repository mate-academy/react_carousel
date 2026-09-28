import React from 'react';
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

type CarouselSettings =
  | 'frameSize'
  | 'step'
  | 'itemWidth'
  | 'animationDuration';

const LIMITS: Record<string, { min: number; max: number }> = {
  itemWidth: { min: 10, max: 400 },
  frameSize: { min: 1, max: 10 },
  step: { min: 1, max: 10 },
  animationDuration: { min: 0, max: 10000 },
};

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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as CarouselSettings;
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : Number(event.target.value);

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const name = event.target.name as CarouselSettings;
    const { min, max } = LIMITS[name];
    const rawValue = Number(event.target.value);
    const clampedValue = Number.isNaN(rawValue)
      ? min
      : Math.min(max, Math.max(min, rawValue));

    this.setState(prevState => ({
      ...prevState,
      [name]: clampedValue,
    }));
  };

  render() {
    const { images, frameSize, step, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="App__title">
          Carousel with {images.length} images
        </h1>
        <div className="App__settings">
          <label className="App__label" htmlFor="itemId">
            Item Width (px):
            <input
              id="itemId"
              type="number"
              name="itemWidth"
              value={itemWidth}
              min={LIMITS.itemWidth.min}
              max={LIMITS.itemWidth.max}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
              className="App__input"
            />
          </label>
          <label className="App__label" htmlFor="frameId">
            Frame Size (items):
            <input
              id="frameId"
              type="number"
              name="frameSize"
              value={frameSize}
              min={LIMITS.frameSize.min}
              max={LIMITS.frameSize.max}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
              className="App__input"
            />
          </label>
          <label className="App__label" htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              name="step"
              value={step}
              min={LIMITS.step.min}
              max={LIMITS.step.max}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
              className="App__input"
            />
          </label>
          <label className="App__label" htmlFor="durationId">
            Animation Duration (ms):
            <input
              id="durationId"
              type="number"
              name="animationDuration"
              value={animationDuration}
              min={LIMITS.animationDuration.min}
              max={LIMITS.animationDuration.max}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
              className="App__input"
            />
          </label>
          <label className="App__label" htmlFor="infinityId">
            Infinity:
            <input
              id="infinityId"
              type="checkbox"
              name="infinite"
              value={infinite ? '1' : '0'}
              checked={!!infinite}
              onChange={this.handleInputChange}
              className="App__checkbox"
            />
          </label>
        </div>

        <div className="App__carousel-wrapper">
          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />
        </div>
      </div>
    );
  }
}

export default App;
