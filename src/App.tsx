import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: Number(value) } as unknown as Pick<
    State,
    keyof State
    >);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="control-panel">
          <label className="control-panel__label" htmlFor="itemId">
            Item width
            <input
              defaultValue={itemWidth}
              onInput={this.handleInputChange}
              className="control-panel__input"
              type="number"
              name="itemWidth"
              id="itemId"
            />
          </label>

          <label className="control-panel__label" htmlFor="stepId">
            Step
            <input
              defaultValue={step}
              onInput={this.handleInputChange}
              className="control-panel__input"
              type="number"
              name="step"
              id="stepId"
              min={1}
              max={images.length}
            />
          </label>

          <label className="control-panel__label" htmlFor="frameId">
            Frame size
            <input
              defaultValue={frameSize}
              onInput={this.handleInputChange}
              className="control-panel__input"
              type="number"
              name="frameSize"
              id="frameId"
              min={1}
              max={images.length}
            />
          </label>

          <label className="control-panel__label">
            Animation duration
            <input
              defaultValue={animationDuration}
              onInput={this.handleInputChange}
              className="control-panel__input"
              type="number"
              name="animDuration"
            />
          </label>
        </div>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
