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
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      itemWidth: +event.target.value,
    }));
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      frameSize: +event.target.value,
    }));
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      step: +event.target.value,
    }));
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState(prevState => ({
      ...prevState,
      animationDuration: +event.target.value,
    }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <form className="form">
          <label htmlFor="itemId" className="form__input">
            Item Width:{' '}
            <input
              type="number"
              id="itemId"
              value={itemWidth}
              onChange={this.handleItemWidthChange}
              placeholder="Item Width"
            />
          </label>
          <label htmlFor="frameId" className="form__input">
            Frame Size:{' '}
            <input
              type="number"
              id="frameId"
              value={frameSize}
              onChange={this.handleFrameSizeChange}
              placeholder="Frame Size"
            />
          </label>
          <label htmlFor="stepId" className="form__input">
            Step:{' '}
            <input
              type="number"
              id="stepId"
              value={step}
              onChange={this.handleStepChange}
              placeholder="Step"
            />
          </label>
          <label htmlFor="animationDuration" className="form__input">
            Animation Duration:{' '}
            <input
              type="number"
              id="animationDuration"
              value={animationDuration}
              onChange={this.handleAnimationDurationChange}
              placeholder="Animation Duration"
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
