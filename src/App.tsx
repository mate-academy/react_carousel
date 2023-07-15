import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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
    infinite: true,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with
          ${images.length}
          images`}
        </h1>
        <form action="#">
          <input
            type="number"
            className="ItemWidth"
            placeholder="Enter the width of the image"
            onChange={(e) => {
              this.setState({ itemWidth: +e.target.value });
            }}
          />

          <input
            type="number"
            className="FrameSize"
            placeholder="Enter the number of the visible image"
            onChange={(e) => {
              this.setState({ frameSize: +e.target.value });
            }}
          />

          <input
            type="number"
            className="Step"
            placeholder="Enter the number of images scrolled per click"
            onChange={(e) => {
              this.setState({ step: +e.target.value });
            }}
          />

          <input
            type="number"
            className="AnimationDuration"
            placeholder="Enter the time in ms to
            show the new portion of images"
            onChange={(e) => {
              this.setState({ animationDuration: +e.target.value });
            }}
          />

          <label>
            Infitite
            <input
              type="checkbox"
              className="infinite"
              checked={this.state.infinite}
              onChange={(e) => {
                this.setState({ infinite: e.target.checked });
              }}
            />
          </label>
        </form>

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
