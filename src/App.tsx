import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  'images': string[];
  'itemWidth': number,
  'frameSize': number,
  'step': number,
  'animationDuration': number,
};

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

  handleOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
    action: keyof State,
  ) {
    this.setState((prevState) => ({
      ...prevState,
      [action]: +event.target.value,
    }));
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
        />

        <form action="">
          <label htmlFor="itemId">
            Item Width:
            <input
              type="text"
              id="itemId"
              value={this.state.itemWidth}
              onChange={(event) => this.handleOnChange(event, 'itemWidth')}
            />
          </label>

          <label htmlFor="frameId">
            Frame Size:
            <input
              type="text"
              id="frameId"
              value={this.state.frameSize}
              onChange={(event) => this.handleOnChange(event, 'frameSize')}
            />
          </label>

          <label htmlFor="stepId">
            Step:
            <input
              type="text"
              id="stepId"
              value={this.state.step}
              onChange={(event) => this.handleOnChange(event, 'step')}
            />
          </label>

          <label htmlFor="animationId">
            Animation Duration:
            <input
              type="text"
              id="animationId"
              value={this.state.animationDuration}
              onChange={(event) => {
                this.handleOnChange(event, 'animationDuration');
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
