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
  };

  changeItemWidth = (width: number) => {
    this.setState({ itemWidth: width });
  };

  changeFrameSize = (size: number) => {
    this.setState({ frameSize: size });
  };

  changeStepLong = (long: number) => {
    this.setState({ step: long });
  };

  changeDuration = (time: number) => {
    this.setState({ animationDuration: time });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="app-form">
          <div className="app-field">
            <h3>Emoji width</h3>

            <input
              type="text"
              className="field"
              defaultValue={`${itemWidth}px`}
              placeholder="emoji width"
              onChange={(event) => this
                .changeItemWidth(+event.currentTarget.value)}
            />
          </div>

          <div className="app-field">
            <h3>Frame size</h3>

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
            <h3>Step per click</h3>

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
            <h3>Animation duration</h3>

            <input
              type="text"
              className="field"
              defaultValue={`${animationDuration}ms`}
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
