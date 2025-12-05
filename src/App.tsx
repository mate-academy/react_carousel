import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name as keyof State;
    let value;

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    } else {
      value = Number(event.target.value) || 0;
    }

    this.setState(prev => ({ ...(prev as State), [key]: value }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="inputs">
          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            name="step"
            type="number"
            value={step}
            onChange={this.handleStateChange}
          />
          <label htmlFor="frameId">Frame size</label>
          <input
            id="frameId"
            name="frameSize"
            type="number"
            value={frameSize}
            onChange={this.handleStateChange}
          />
          <label htmlFor="itemId">Width</label>
          <input
            id="itemId"
            name="itemWidth"
            type="number"
            value={itemWidth}
            onChange={this.handleStateChange}
          />
          <label htmlFor="animationDurationId">Animation duration</label>
          <input
            id="animationDurationId"
            name="animationDuration"
            type="number"
            value={animationDuration}
            onChange={this.handleStateChange}
          />
          <label htmlFor="infiniteId">Infinite loop</label>
          <input
            id="infiniteId"
            name="infinite"
            type="checkbox"
            checked={infinite}
            onChange={this.handleStateChange}
          />
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
