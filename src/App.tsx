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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    this.setState(state => ({
      ...state,
      [id]: value,
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
        <form className="Options">
          <label className="label" htmlFor="itemWidth">
            Item width:
            <input
              type="number"
              className="input"
              value={itemWidth}
              id="itemWidth"
              onChange={this.handleChange}
            />
          </label>

          <label className="label" htmlFor="frameSize">
            Frame size:
            <input
              type="number"
              min={0}
              max={images.length}
              className="input"
              value={frameSize}
              id="frameSize"
              onChange={this.handleChange}
            />
          </label>

          <label className="label" htmlFor="step">
            Step:
            <input
              type="number"
              min={0}
              max={images.length}
              className="input"
              value={step}
              id="step"
              onChange={this.handleChange}
            />
          </label>

          <label className="label" htmlFor="animationDuration">
            Animation Duration:
            <input
              type="number"
              className="input"
              value={animationDuration}
              id="animationDuration"
              onChange={this.handleChange}
            />
          </label>

          <label className="label" htmlFor="infinite">
            Infinite:
            <input
              type="checkbox"
              className="input"
              id="infinite"
              checked={infinite}
              onChange={() => {
                this.setState({ infinite: !infinite });
              }}
            />
          </label>
        </form>

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
