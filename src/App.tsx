import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value: v } = event.target;

    this.setState({ [id]: parseInt(v) } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemWidth">Item width</label>
        <input
          id="itemWidth"
          type="number"
          onChange={this.handleChange}
          value={itemWidth}
        />

        <label htmlFor="frameSize">Frame size</label>
        <input
          id="frameSize"
          type="number"
          onChange={this.handleChange}
          value={frameSize}
        />

        <label htmlFor="step">Step</label>
        <input
          id="step"
          type="number"
          onChange={this.handleChange}
          value={step}
        />

        <label htmlFor="animationDuration">Animation duration</label>
        <input
          id="animationDuration"
          type="number"
          onChange={this.handleChange}
          value={animationDuration}
        />

        <Carousel
          images={images}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={true}
          step={step}
          frameSize={frameSize}
        />
      </div>
    );
  }
}

export default App;
