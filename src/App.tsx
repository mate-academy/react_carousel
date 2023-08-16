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

  handleInfiniteToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: e.target.checked });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10),
    }));
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
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>
        <div className="inputs">
          <label htmlFor="itemID">
            Item Width:
            <input
              id="itemID"
              type="number"
              name="itemWidth"
              value={itemWidth}
              min={130}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="frameID">
            Frame Size:
            <input
              id="frameID"
              type="number"
              name="frameSize"
              value={frameSize}
              min={1}
              max={10}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="stepID">
            Step:
            <input
              id="step"
              type="number"
              name="stepID"
              value={step}
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
              checked={infinite}
              onChange={this.handleInfiniteToggle}
            />
          </label>
        </div>

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
