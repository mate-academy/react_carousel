import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const givenImages = [
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
];

interface State {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
}

class App extends React.Component<{}, State> {
  state = {
    images: givenImages,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  // Form Input Function
  onChangeformInput = (
    event: React.FormEvent<HTMLInputElement>,
    item: string,
  ) => {
    if (item === 'step') {
      this.setState({ step: +event.currentTarget.value });
    }

    if (item === 'frameSize') {
      this.setState({ frameSize: +event.currentTarget.value });
    }

    if (item === 'itemWidth') {
      this.setState({ itemWidth: +event.currentTarget.value });
    }

    if (item === 'animationDuration') {
      this.setState({ animationDuration: +event.currentTarget.value });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title'>
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />

        <h2>Set Controler Values for Carosel</h2>
        <form className="App__form">
          <label className="App__label">
            ItemWidth:
            <input
              className="App__input"
              type="number"
              value={this.state.itemWidth}
              onChange={(event) => this.onChangeformInput(event, 'itemWidth')}
            />
          </label>

          <label className="App__label">
            FrameSize:
            <input
              className="App__input"
              type="number"
              value={this.state.frameSize}
              onChange={(event) => this.onChangeformInput(event, 'frameSize')}
            />
          </label>

          <label className="App__label">
            Step:
            <input
              className="App__input"
              type="number"
              value={this.state.step}
              onChange={(event) => this.onChangeformInput(event, 'step')}
            />
          </label>

          <label className="App__label">
            AnimationDuration:
            <input
              className="App__input"
              type="number"
              value={this.state.animationDuration}
              onChange={(event) => this.onChangeformInput(
                event,
                'animationDuration',
              )}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
