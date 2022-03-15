import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number,
  step: number,
  itemWidth: number,
  infinite: boolean,
  animationDuration: number,
}

class App extends React.Component<{}, State> {
  state = {
    animationDuration: 1000,
    itemWidth: 130,
    step: 1,
    frameSize: 1,
    infinite: false,
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

  render() {
    const {
      images, frameSize, step, animationDuration, itemWidth, infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Carousel</h1>

        <Carousel
          images={images}
          step={step}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="App__controler">
          <label htmlFor="frameSize" className="App__label">
            {'Frame size: '}
            {frameSize}

            <input
              id="frameSize"
              type="range"
              min={1}
              max={images.length}
              // max={10}
              value={frameSize}
              onChange={(e) => {
                this.setState({ frameSize: +e.target.value });
              }}
            />
          </label>

          <label htmlFor="step" className="App__label">
            {'Step: '}
            {step}

            <input
              id="step"
              type="range"
              min={1}
              max={images.length}
              value={step}
              onChange={(e) => {
                this.setState({ step: +e.target.value });
              }}
            />
          </label>

          <label htmlFor="animationDuration" className="App__label">
            {'Animation duration: '}
            {animationDuration}

            <input
              id="animationDuration"
              type="range"
              min={0}
              max={1000}
              step={100}
              value={animationDuration}
              onChange={(e) => {
                this.setState({ animationDuration: +e.target.value });
              }}
            />
          </label>

          <label htmlFor="itemWidth" className="App__label">
            {'Item width: '}
            {itemWidth}

            <input
              id="itemWidth"
              type="range"
              min={50}
              max={250}
              step={10}
              value={itemWidth}
              onChange={(e) => {
                this.setState({ itemWidth: +e.target.value });
              }}
            />
          </label>

          <label htmlFor="infinite" className="App__label">
            {'Infinite: '}
            {infinite}

            <input
              id="infinite"
              type="checkbox"
              min={50}
              max={250}
              step={10}
              checked={infinite}
              onChange={(e) => {
                this.setState({ infinite: e.target.checked });
              }}
            />
          </label>
        </div>

      </div>
    );
  }
}

export default App;
