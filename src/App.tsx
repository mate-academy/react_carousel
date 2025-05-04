import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : Number(value),
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemId">Item Width:</label>
        <input
          id="itemId"
          name="itemWidth"
          type="number"
          value={itemWidth}
          onChange={this.handleChange}
        />

        <label htmlFor="frameId">Frame Size:</label>
        <input
          id="frameId"
          name="frameSize"
          type="number"
          value={frameSize}
          onChange={this.handleChange}
        />

        <label htmlFor="stepId">Step:</label>
        <input
          id="stepId"
          name="step"
          type="number"
          value={step}
          onChange={this.handleChange}
        />

        <label htmlFor="durationId">Animation Duration (ms):</label>
        <input
          id="durationId"
          name="animationDuration"
          type="number"
          value={animationDuration}
          onChange={this.handleChange}
        />

        <label htmlFor="infiniteId">Infinite:</label>
        <input
          id="infiniteId"
          name="infinite"
          type="checkbox"
          checked={infinite}
          onChange={this.handleChange}
        />

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
