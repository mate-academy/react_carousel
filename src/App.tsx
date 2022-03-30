import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { InputRange } from './components/InputRange';
import { CarouselSettings } from './types/CarouselSettings';

class App extends React.Component<{}, CarouselSettings> {
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

  setNewState = (value: number, stateKey: string) => {
    this.setState((state) => ({
      ...state,
      [stateKey]: value,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <div className="app__carousel-settings">
          <div className="app__carousel-settings-item">
            {`Step: ${step}`}
            <InputRange
              id="step"
              value={step}
              max={images.length}
              callback={this.setNewState}
            />
          </div>

          <div className="app__carousel-settings-item">
            {`Slide to show: ${frameSize}`}
            <InputRange
              id="frameSize"
              value={frameSize}
              max={images.length}
              callback={this.setNewState}
            />
          </div>

          <div className="app__carousel-settings-item">
            {`Slide width: ${itemWidth}px`}
            <InputRange
              id="itemWidth"
              value={itemWidth}
              max={230}
              min={130}
              callback={this.setNewState}
              step={10}
            />
          </div>

          <div className="app__carousel-settings-item">
            {`Animation duration: ${animationDuration}ms`}
            <InputRange
              id="animationDuration"
              value={animationDuration}
              max={1000}
              min={100}
              callback={this.setNewState}
              step={50}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
