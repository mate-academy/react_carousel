import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { CarouselSettings } from './types/CarouselSettings';

interface State extends CarouselSettings {
  images: string[];
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
    infinite: false,
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: Number(event.target.value) });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: Number(event.target.value) });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(event.target.value) });
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ animationDuration: Number(event.target.value) });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="input__container">
          <div className="input__label">
            <label className="input__wrapper">
              Item Width:
              <input
                type="number"
                id="itemId"
                className="input__sett"
                {...{ for: 'itemId' }}
                value={itemWidth}
                onChange={this.handleItemWidthChange}
              />
            </label>
          </div>

          <div className="input__label">
            <label className="input__wrapper">
              Number of Items:
              <input
                type="number"
                id="frameId"
                className="input__sett"
                {...{ for: 'frameId' }}
                value={frameSize}
                onChange={this.handleFrameSizeChange}
              />
            </label>
          </div>

          <div className="input__label">
            <label className="input__wrapper">
              Step:
              <input
                type="number"
                id="stepId"
                className="input__sett"
                {...{ for: 'stepId' }}
                value={step}
                onChange={this.handleStepChange}
              />
            </label>
          </div>

          <div className="input__label">
            <label className="input__wrapper">
              Animation Duration:
              <input
                type="number"
                id="animationDurationId"
                className="input__sett"
                {...{ for: 'animationDurationId' }}
                value={animationDuration}
                onChange={this.handleAnimationDurationChange}
              />
            </label>
          </div>
        </div>

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
