import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

type CarouselSettings =
  | 'frameSize'
  | 'step'
  | 'itemWidth'
  | 'animationDuration';

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
    frameSize: 3,
    step: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as CarouselSettings;
    const value = Number(event.target.value);

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    const { images, frameSize, step, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div>
          <h2>Filters:</h2>
          <label htmlFor="frameId">Frame size</label>
          <input
            id="frameId"
            name="frameSize"
            type="number"
            value={this.state.frameSize}
            onChange={this.handleChange}
            max={10}
            min={1}
          />

          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            name="step"
            type="number"
            value={this.state.step}
            onChange={this.handleChange}
          />

          <label htmlFor="itemId">Item Width</label>
          <input
            id="itemId"
            name="itemWidth"
            type="number"
            value={this.state.itemWidth}
            onChange={this.handleChange}
          />

          <label htmlFor="animationDuration">Animation Duration</label>
          <input
            id="animationDuration"
            name="animationDuration"
            type="number"
            value={this.state.animationDuration}
            onChange={this.handleChange}
          />
        </div>

        <Carousel
          images={images}
          frameSize={frameSize}
          step={step}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
