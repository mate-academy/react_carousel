import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type Inputs = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

interface State {
  images: string[];
  inputs: Inputs;
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default class App extends React.Component<{}, State> {
  state: State = {
    images: [
      '/img/1.png',
      '/img/2.png',
      '/img/3.png',
      '/img/4.png',
      '/img/5.png',
      '/img/6.png',
      '/img/7.png',
      '/img/8.png',
      '/img/9.png',
      '/img/10.png',
    ],
    inputs: {
      itemWidth: 130,
      frameSize: 3,
      step: 3,
      animationDuration: 1000,
      infinite: false,
    },
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, valueAsNumber, value } = event.target;

    this.setState(prev => {
      const { images } = prev;
      let next: Inputs = { ...prev.inputs };

      if (type === 'checkbox') {
        next[name as keyof Inputs] = checked as any;
      } else {
        // Безопасное число
        const raw = Number.isNaN(valueAsNumber) ? Number(value) : valueAsNumber;

        switch (name as keyof Inputs) {
          case 'itemWidth':
            next.itemWidth = clamp(Math.round(raw || 0), 50, 1000);
            break;
          case 'frameSize':
            next.frameSize = clamp(Math.round(raw || 1), 1, images.length);
            // также поправим step, если стал больше frameSize
            next.step = clamp(next.step, 1, images.length);
            break;
          case 'step':
            next.step = clamp(Math.round(raw || 1), 1, images.length);
            break;
          case 'animationDuration':
            next.animationDuration = clamp(Math.round(raw || 0), 0, 10000);
            break;
          default:
            break;
        }
      }

      return { inputs: next } as Pick<State, 'inputs'>;
    });
  };

  render() {
    const { images, inputs } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="container">
          <label htmlFor="itemId">
            Enter images width (px)
            <input
              type="number"
              id="itemId"
              name="itemWidth"
              value={inputs.itemWidth}
              onChange={this.handleInputChange}
              placeholder="Enter images width (px)"
              min={50}
              max={1000}
              step={10}
              inputMode="numeric"
            />
          </label>

          <label htmlFor="frameId">
            Enter the number of images displayed at the same time
            <input
              type="number"
              id="frameId"
              name="frameSize"
              value={inputs.frameSize}
              onChange={this.handleInputChange}
              placeholder="Enter the number of images"
              min={1}
              max={images.length}
              step={1}
              inputMode="numeric"
            />
          </label>

          <label htmlFor="stepId">
            Enter number of images scrolled per click
            <input
              type="number"
              id="stepId"
              name="step"
              value={inputs.step}
              onChange={this.handleInputChange}
              placeholder="Enter number of images scrolled per click"
              min={1}
              max={images.length}
              step={1}
              inputMode="numeric"
            />
          </label>

          <label htmlFor="animId">
            Enter animation duration (ms)
            <input
              type="number"
              id="animId"
              name="animationDuration"
              value={inputs.animationDuration}
              onChange={this.handleInputChange}
              placeholder="Enter animation duration (ms)"
              min={0}
              max={10000}
              step={50}
              inputMode="numeric"
            />
          </label>

          <label htmlFor="infinite" className="checkbox">
            Infinite loop:
            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              checked={inputs.infinite}
              onChange={this.handleInputChange}
            />
          </label>
        </div>

        <Carousel
          images={images}
          frameSize={inputs.frameSize}
          step={inputs.step}
          itemWidth={inputs.itemWidth}
          animationDuration={inputs.animationDuration}
          infinite={inputs.infinite}
        />
      </div>
    );
  }
}
