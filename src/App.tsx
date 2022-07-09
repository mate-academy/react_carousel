import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  isInfinite: boolean;
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
    isInfinite: false,
  };

  changeItemWidth = (value: number) => {
    this.setState({ itemWidth: value });
  };

  changeFrameSize = (value: number) => {
    this.setState({ frameSize: value });
  };

  changeStep = (value: number) => {
    this.setState({ step: value });
  };

  changeAnimationDuration = (value: number) => {
    this.setState({ animationDuration: value });
  };

  disableInfinite = () => {
    return this.state.isInfinite
      ? this.setState({ isInfinite: false })
      : this.setState({ isInfinite: true });
  };

  render() {
    const {
      images,
      frameSize,
      step,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={this.state.isInfinite}
        />

        <div className="App__container">
          <div className="App__input-box">
            <span className="App__input-text">Emoji size</span>
            <input
              className="App__input"
              type="number"
              name="itemWidth"
              min="50"
              max="300"
              step="10"
              defaultValue={itemWidth}
              onChange={({ target }) => {
                this.changeItemWidth(+target.value);
              }}
            />
          </div>

          <div className="App__input-box">
            <span className="App__input-text">Carousel width</span>
            <input
              className="App__input"
              type="number"
              name="frameSize"
              min="1"
              max="10"
              defaultValue={frameSize}
              onChange={({ target }) => {
                this.changeFrameSize(+target.value);
              }}
            />
          </div>

          <div className="App__input-box">
            <span className="App__input-text">Step</span>
            <input
              className="App__input"
              type="number"
              name="step"
              min="1"
              max="9"
              defaultValue={step}
              onChange={({ target }) => {
                this.changeStep(+target.value);
              }}
            />
          </div>

          <div className="App__input-box">
            <span className="App__input-text">Scrolling duration</span>
            <input
              className="App__input"
              type="number"
              name="animationDuration"
              min="0"
              max="10000"
              step="100"
              defaultValue={animationDuration}
              onChange={({ target }) => {
                this.changeAnimationDuration(+target.value);
              }}
            />
          </div>

          <div className="App__input-box">
            <label htmlFor="disabled" className="App__input-text">
              Infinite scroll
            </label>
            <input
              className="App__input"
              type="checkbox"
              name="disabled"
              onClick={this.disableInfinite}
              defaultChecked={this.state.isInfinite}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
