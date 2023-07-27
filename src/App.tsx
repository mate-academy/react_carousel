import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

class AppAltern extends React.Component<{}, State> {
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
    animationDuration: 1000,
    step: 3,
    infinite: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValueVariable = Number(event.target.value);
    const { name } = event.target;

    const isStateKey = (str: string): str is keyof State => (
      Object.keys(this.state).includes(str)
    );

    if (isStateKey(name)) {
      this.setState({
        [name]: newValueVariable,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }
  };

  handleInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
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
        <h1 data-cy="title"
          className="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
          step={step}
          infinite={infinite}
        />

        <label className="variables">
          Item width:
          <input
            className="variables__input"
            type="number"
            name="itemWidth"
            value={itemWidth}
            onChange={this.handleChange}
            min="130"
            max="390"
          />
        </label>

        <label className="variables">
          Frame size:
          <input
            className="variables__input"
            type="number"
            name="frameSize"
            value={frameSize}
            onChange={this.handleChange}
            min="1"
            max="10"
          />
        </label>

        <label className="variables">
          Step:
          <input
            className="variables__input"
            type="number"
            name="step"
            value={step}
            onChange={this.handleChange}
            min="1"
            max="10"
          />
        </label>

        <label className="variables">
          Animation duration:
          <input
            className="variables__input"
            type="number"
            name="animationDuration"
            value={animationDuration}
            onChange={this.handleChange}
          />
        </label>

        <label className="variables">
          {'Infinite: '}
          <input
            type="checkbox"
            name="infinite"
            id="infinite"
            className="variables__input"
            checked={infinite}
            onChange={this.handleInfinite}
          />
        </label>
      </div>
    );
  }
}

export default AppAltern;
