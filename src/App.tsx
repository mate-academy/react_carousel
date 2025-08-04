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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in this.state && !isNaN(Number(value))) {
      this.setState({
        [name]: Number(value),
      } as unknown as Pick<State, keyof State>);
    }
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="App__title">
          Carousel with {images.length} images
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <div className="App__params">
          <label htmlFor="stepId">Step:</label>
          <input
            type="number"
            id="stepId"
            min={1}
            max={images.length}
            name="step"
            value={this.state.step}
            onChange={this.handleChange}
          />
          <label htmlFor="frameId">Frame Size:</label>
          <input
            type="number"
            id="frameId"
            min={1}
            max={9}
            name="frameSize"
            value={this.state.frameSize}
            onChange={this.handleChange}
          />
          <label htmlFor="itemId">Item Width:</label>
          <input
            type="number"
            id="itemId"
            min={50}
            max={210}
            step={10}
            name="itemWidth"
            value={this.state.itemWidth}
            onChange={this.handleChange}
          />
          <label>
            Animation Duration:
            <input
              type="number"
              min={0}
              max={2000}
              step={100}
              name="animationDuration"
              value={this.state.animationDuration}
              onChange={this.handleChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
