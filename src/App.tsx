import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number
  animationDuration: number,
  infinite: boolean,
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
    step: 1,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  fixItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // eslint-disable-next-line no-console
    console.log(value);
    this.setState({ itemWidth: +value });
  };

  fixFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // eslint-disable-next-line no-console
    console.log(value);
    this.setState({ frameSize: +value });
  };

  fixStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ step: +value });
  };

  fixAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ animationDuration: +value });
  };

  fixFinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    this.setState({
      infinite: checked,
    });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="app">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <form
          action="/"
          className="form"
          method="POST"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label htmlFor="itemWidth" className="form__label">
            {' Item width '}
          </label>
          <input
            id="itemWidth"
            name="itemWidth"
            className="form__input"
            type="number"
            min="50"
            max="300"
            defaultValue={itemWidth}
            onChange={this.fixItemWidth}
          />

          <label htmlFor="frameSize" className="form__label">
            {' Frame size '}
          </label>
          <input
            id="frameSize"
            name="frameSize"
            className="form__input"
            type="number"
            min="1"
            max={images.length}
            defaultValue={frameSize}
            onChange={this.fixFrameSize}
          />

          <label htmlFor="step" className="form__label">
            {' Step '}
          </label>
          <input
            id="step"
            name="step"
            className="form__input"
            min="1"
            max="5"
            type="number"
            defaultValue={step}
            onChange={this.fixStep}
          />

          <label htmlFor="infinite" className="form__label">
            {' Animation duration '}
          </label>
          <input
            id="animationDuration"
            name="animationDuration"
            className="form__input"
            type="number"
            defaultValue={animationDuration}
            onChange={this.fixAnimationDuration}
          />

          <label htmlFor="infinite" className="form__label">
            {' Infinite '}
          </label>
          <input
            className="form__input"
            type="checkbox"
            name="infinite"
            id="infinite"
            onChange={this.fixFinite}
          />
        </form>

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
