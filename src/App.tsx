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

  handleSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name as keyof State;
    const { value, type, checked } = target;
    let newValue: string | number | boolean;

    if (type === 'number') {
      newValue = +value;
    } else if (type === 'checkbox') {
      newValue = checked;
    } else {
      newValue = value;
    }

    this.setState({ [name]: newValue } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel</h1>
        <label htmlFor="itemWidthId">
          Item width
          <input
            id="itemWidthId"
            type="number"
            name="itemWidth"
            value={this.state.itemWidth}
            onChange={this.handleSettingChange}
          />
        </label>
        <label htmlFor="frameSizeId">
          Frame size
          <input
            id="frameSizeId"
            type="number"
            name="frameSize"
            value={this.state.frameSize}
            onChange={this.handleSettingChange}
          />
        </label>
        <label htmlFor="stepId">
          Step
          <input
            id="stepId"
            type="number"
            name="step"
            value={this.state.step}
            onChange={this.handleSettingChange}
          />
        </label>
        <label htmlFor="animationDurationId">
          Animation duration
          <input
            id="animationDurationId"
            type="number"
            name="animationDuration"
            value={this.state.animationDuration}
            onChange={this.handleSettingChange}
          />
        </label>
        <label htmlFor="infiniteId">
          Infinite
          <input
            id="infiniteId"
            type="checkbox"
            name="infinite"
            checked={this.state.infinite}
            onChange={this.handleSettingChange}
          />
        </label>

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
