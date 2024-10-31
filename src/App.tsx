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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : parseInt(value),
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="controls">
          <label>
            Image Width:
            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              data-cy="item-width-input"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Frame Size:
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              data-cy="frame-size-input"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Scroll Step:
            <input
              type="number"
              name="step"
              value={step}
              data-cy="step-input"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Animation Duration:
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Infinite:
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
