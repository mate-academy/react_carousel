import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  setItemWidth(value: number): void {
    this.setState(prevState => ({ ...prevState, itemWidth: value }));
  }

  setFrameSize(value: number): void {
    this.setState(prevState => ({ ...prevState, frameSize: value }));
  }

  setStep(value: number): void {
    this.setState(prevState => ({ ...prevState, step: value }));
  }

  setAnimationDuration(value: number): void {
    this.setState(prevState => ({ ...prevState, animationDuration: value }));
  }

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />

        <div className="customizing">
          <div className="customizing__block">
            <label htmlFor="itemId" className="customizing__label">
              item width:
            </label>
            <input
              id="itemId"
              type="number"
              min="0"
              value={itemWidth}
              className="customizing__input customizing__input--width"
              onChange={e => {
                const value: number = +e.target.value;

                this.setItemWidth(value);
              }}
            />
          </div>
          <div className="customizing__block">
            <label htmlFor="frameId" className="customizing__label">
              frame size:
            </label>
            <input
              id="frameId"
              type="number"
              min="0"
              value={frameSize}
              className="customizing__input customizing__input--frame"
              onChange={e => {
                const value: number = +e.target.value;

                this.setFrameSize(value);
              }}
            />
          </div>
          <div className="customizing__block">
            <label htmlFor="stepId" className="customizing__label">
              scroll step:
            </label>
            <input
              id="stepId"
              type="number"
              min="0"
              value={step}
              className="customizing__input customizing__input--step"
              onChange={e => {
                const value: number = +e.target.value;

                this.setStep(value);
              }}
            />
          </div>
          <div className="customizing__block">
            <label htmlFor="durationId" className="customizing__label">
              duration:
            </label>
            <input
              id="durationId"
              type="number"
              min="0"
              value={animationDuration}
              className="customizing__input customizing__input--duration"
              onChange={e => {
                const value: number = +e.target.value;

                this.setAnimationDuration(value);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
