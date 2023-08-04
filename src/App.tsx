import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number,
  animationDuration: number,
  infinite: boolean,
  itemWidthError: boolean,
  frameSizeError: boolean,
  stepError: boolean,
  durationError: boolean,
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
    frameSize: 3,
    itemWidth: 130,
    step: 3,
    animationDuration: 1000,
    infinite: false,
    itemWidthError: false,
    frameSizeError: false,
    stepError: false,
    durationError: false,
  };

  changeItemWidth = (width: number) => {
    if (Number.isNaN(width) || width < 30 || width > 200) {
      this.setState({ itemWidthError: true });

      return;
    }

    this.setState({ itemWidth: width, itemWidthError: false });
  };

  changeFrameSize = (size: number) => {
    if (Number.isNaN(size) || size < 1 || size > 10) {
      this.setState({ frameSizeError: true });

      return;
    }

    this.setState({ frameSize: size, frameSizeError: false });
  };

  changeStepLong = (long: number) => {
    if (Number.isNaN(long) || long < 1 || long > 10) {
      this.setState({ stepError: true });

      return;
    }

    this.setState({ step: long, stepError: false });
  };

  changeDuration = (time: number) => {
    if (Number.isNaN(time) || time < 500 || time > 3000) {
      this.setState({ durationError: true });

      return;
    }

    this.setState({ animationDuration: time, durationError: false });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
      animationDuration,
      infinite,
      itemWidthError,
      frameSizeError,
      stepError,
      durationError,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="app-form">
          <div className="app-field">
            {itemWidthError ? (
              <h3 style={{ color: 'red' }}>
                Input number!
                <br />
                from 30 to 200
              </h3>
            ) : (
              <h3>Emoji width, px</h3>
            )}
            <input
              type="text"
              className="field"
              defaultValue={itemWidth}
              placeholder="emoji width"
              onChange={(event) => this
                .changeItemWidth(+event.currentTarget.value)}
            />
          </div>

          <div className="app-field">
            {frameSizeError ? (
              <h3 style={{ color: 'red' }}>
                Input number!
                <br />
                from 1 to 10
              </h3>
            ) : (
              <h3>Frame size</h3>
            )}
            <input
              type="text"
              className="field"
              defaultValue={frameSize}
              placeholder="frame size"
              onChange={(event) => this
                .changeFrameSize(+event.currentTarget.value)}
            />
          </div>

          <div className="app-field">
            {stepError ? (
              <h3 style={{ color: 'red' }}>
                Input number!
                <br />
                from 1 to 10
              </h3>
            ) : (
              <h3>Step per click</h3>
            )}
            <input
              type="text"
              className="field"
              defaultValue={step}
              placeholder="step per click"
              onChange={(event) => this
                .changeStepLong(+event.currentTarget.value)}
            />
          </div>

          <div className="app-field">
            {durationError ? (
              <h3 style={{ color: 'red' }}>
                Input number!
                <br />
                from 500 to 3000
              </h3>
            ) : (
              <h3>Animation duration, ms</h3>
            )}
            <input
              type="text"
              className="field"
              defaultValue={`${animationDuration}`}
              placeholder="duration"
              onChange={(event) => this
                .changeDuration(+event.currentTarget.value)}
            />
          </div>
        </div>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
