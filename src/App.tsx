import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newValue: number;

    if (+value < 1) {
      newValue = 1;
    } else if (name === 'itemWidth' && +value > 300) {
      newValue = 300;
    } else if (name === 'frameSize' && +value > 4) {
      newValue = 4;
    } else if (name === 'step' && +value > 5) {
      newValue = 5;
    } else {
      newValue = +value;
    }

    this.setState(prevState => ({
      ...prevState,
      [name]: +newValue,
    }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="title" data-cy="title">
          Carousel with {images.length} images
        </h1>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <form action="#" className="form">
          <label htmlFor="itemId" className="form__label">
            ItemWidth:
            <input
              name="itemWidth"
              type="number"
              className="form__input"
              value={this.state.itemWidth}
              onChange={this.handleInputChange}
              min={130}
              max={300}
            />
          </label>

          <label htmlFor="frameId" className="form__label">
            FrameSize:
            <input
              name="frameSize"
              type="number"
              className="form__input"
              value={this.state.frameSize}
              onChange={this.handleInputChange}
              min={1}
              max={4}
            />
          </label>
          <label htmlFor="stepId" className="form__label">
            Step:
            <input
              name="step"
              type="number"
              className="form__input"
              value={this.state.step}
              onChange={this.handleInputChange}
              min={1}
              max={10}
            />
          </label>

          <label htmlFor="animationDurationId" className="form__label">
            AnimationDuration:
            <input
              name="animationDuration"
              type="number"
              className="form__input"
              value={this.state.animationDuration}
              onChange={this.handleInputChange}
              min={0}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
