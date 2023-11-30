import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number,
  step: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    animationDuration: 1000,
    infinite: false,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
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
  };

  setInfinity(value: boolean) {
    this.setState({ infinite: value });
  }

  setFrameSize(value: number) {
    this.setState({ frameSize: value });
  }

  setStep(value: number) {
    this.setState({ step: value });
  }

  setItemWidth(value: number) {
    this.setState({ itemWidth: value });
  }

  setAnimationDuration(value: number) {
    this.setState({ animationDuration: value });
  }

  render() {
    const {
      images, frameSize, step, animationDuration, itemWidth, infinite,
    } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Carousel</h1>

        <Carousel
          images={images}
          step={step}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
          infinite={infinite}
          className="app__carousel"
        />

        <div className="app__controler">
          <label htmlFor="frameSize" className="app__label">
            {`Frame size: ${frameSize}`}

            <input
              id="frameSize"
              type="range"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={(e) => this.setFrameSize(+e.target.value)}
            />
          </label>

          <label htmlFor="step" className="app__label">
            {`Step: ${step}`}

            <input
              id="step"
              type="range"
              min={1}
              max={frameSize}
              value={step}
              onChange={(e) => this.setStep(+e.target.value)}
            />
          </label>

          <label htmlFor="animationDuration" className="app__label">
            {`Animation duration: ${animationDuration}`}

            <input
              id="animationDuration"
              type="range"
              min={0}
              max={1000}
              step={100}
              value={animationDuration}
              onChange={(e) => this.setAnimationDuration(+e.target.value)}
            />
          </label>

          <label htmlFor="itemWidth" className="app__label">
            {`Item width: ${itemWidth}`}

            <input
              id="itemWidth"
              type="range"
              min={50}
              max={250}
              step={10}
              value={itemWidth}
              onChange={(e) => this.setItemWidth(+e.target.value)}
            />
          </label>

          <label htmlFor="infinite" className="app__label">
            {'Infinite: '}

            <input
              id="infinite"
              type="checkbox"
              min={50}
              max={250}
              step={10}
              checked={infinite}
              onChange={(e) => this.setInfinity(e.target.checked)}
            />
          </label>

          <p className="app__info">INFO: To make endless mode work properly, first select &quot;frameSize&quot;</p>
        </div>

      </div>
    );
  }
}

export default App;
