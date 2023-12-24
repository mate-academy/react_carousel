import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
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
    itemWidth: 130,
    frameSize: 3,
    animationDuration: 1000,
  };

  handleInputStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    this.setState({ step: value });
  };

  handleInputWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    this.setState({ itemWidth: value });
  };

  handleInputFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    this.setState({ frameSize: value });
  };

  handleInputAnimationDuration = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value, 10);

    this.setState({ animationDuration: value });
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
        <h1 className="App__title" data-cy="title">
          {/* eslint-disable-next-line */}
          Carousel with {images.length} images
        </h1>

        <div className="App__inputs inputs">
          <div className="input-block">
            <span>Step:&nbsp;</span>
            <input
              className="input"
              type="number"
              name="step"
              min={1}
              max={10}
              defaultValue={step}
              onChange={this.handleInputStep}
            />
          </div>

          <div className="input-block">
            <span>Frame size:&nbsp;</span>
            <input
              className="input"
              type="number"
              name="frameSize"
              min={1}
              max={10}
              defaultValue={frameSize}
              onChange={this.handleInputFrameSize}
            />
          </div>

          <div className="input-block">
            <span>Item width:&nbsp;</span>
            <input
              className="input"
              type="number"
              name="itemWidth"
              step={10}
              min={50}
              defaultValue={itemWidth}
              onChange={this.handleInputWidth}
            />
          </div>

          <div className="input-block">
            <span>Animation duration:&nbsp;</span>
            <input
              className="input"
              type="number"
              name="animationDuration"
              step={100}
              defaultValue={animationDuration}
              onChange={this.handleInputAnimationDuration}
            />
          </div>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
