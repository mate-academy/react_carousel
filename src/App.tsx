import React from 'react';
import './App.scss';
import './Form.scss';
import Carousel from './components/Carousel';

interface State {
  images?: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
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

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    const stateCopy = { ...this.state };

    this.setState({
      ...stateCopy,
      [name]: +value,
    });
  };

  render() {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
        />

        <>
          <form className="form">
            <label htmlFor="itemWidth">
              Image width:
              <input
                type="number"
                id="itemWidth"
                name="itemWidth"
                value={itemWidth}
                onChange={this.handleInput}
                className="form__input"
              />
            </label>

            <label htmlFor="frameSize">
              Frame size:
              <input
                type="number"
                id="frameSize"
                name="frameSize"
                value={frameSize}
                onChange={this.handleInput}
                className="form__input"
              />
            </label>

            <label htmlFor="step">
              Step:
              <input
                type="number"
                id="step"
                name="step"
                value={step}
                onChange={this.handleInput}
                className="form__input"
              />
            </label>

            <label htmlFor="animationDuration">
              Animation duration:
              <input
                type="number"
                id="animationDuration"
                name="animationDuration"
                value={animationDuration}
                onChange={this.handleInput}
                step="500"
                className="form__input"
              />
            </label>
          </form>
        </>
      </div>
    );
  }
}

export default App;
