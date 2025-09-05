import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : Number(value),
    } as unknown as Pick<State, keyof State>);
  }

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="container">
          <label htmlFor="itemId">Item Width:</label>
          <input
            id="itemId"
            type="number"
            name="itemWidth"
            value={itemWidth}
            onChange={e => this.handleInput(e)}
          />

          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            type="number"
            name="frameSize"
            value={frameSize}
            onChange={e => this.handleInput(e)}
          />

          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            name="step"
            value={step}
            onChange={e => this.handleInput(e)}
          />

          <label htmlFor="animationDurationId">Animation Duration (ms):</label>
          <input
            id="animationDurationId"
            type="number"
            name="animationDuration"
            value={animationDuration}
            onChange={e => this.handleInput(e)}
          />

          <label htmlFor="infiniteId">Infinite:</label>
          <input
            id="infiniteId"
            type="checkbox"
            name="infinite"
            checked={infinite}
            onChange={e => this.handleInput(e)}
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
