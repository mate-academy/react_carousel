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
    const property = e.target.name;
    const value = +e.target.value;

    this.setState(prevState => ({
      ...prevState,
      [property]: value,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1
          className="title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form action="" className="inputs">
          <label htmlFor="itemId">
            Item width:
          </label>
          <input
            type="number"
            name="itemWidth"
            id="itemId"
            value={itemWidth}
            onChange={this.handleChange}
            min="0"
          />

          <label htmlFor="frameId">
            Frame size:
          </label>
          <input
            type="number"
            name="frameSize"
            id="frameId"
            value={frameSize}
            onChange={this.handleChange}
            min="0"
          />

          <label htmlFor="stepId">
            Step:
          </label>
          <input
            type="number"
            name="step"
            id="stepId"
            value={step}
            onChange={this.handleChange}
            min="0"
          />

          <label htmlFor="animationDuration">
            Animation duration:
          </label>
          <input
            type="number"
            name="animationDuration"
            id="animationDuration"
            value={animationDuration}
            onChange={this.handleChange}
            min="0"
          />
        </form>
      </div>
    );
  }
}

export default App;
