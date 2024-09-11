import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
    infinite: false,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form className="form">
          <label className="form__label" htmlFor="stepId">
            Step:{' '}
            <input
              id="stepId"
              type="number"
              min={1}
              max={5}
              value={this.state.step}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ step: +event.target.value })
              }
            />
          </label>
          <label className="form__label" htmlFor="frameId">
            Frame Size:{' '}
            <input
              id="frameId"
              type="number"
              min={2}
              max={7}
              value={this.state.frameSize}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ frameSize: +event.target.value })
              }
            />
          </label>
          <label className="form__label" htmlFor="itemId">
            Item Width:{' '}
            <input
              id="itemId"
              type="number"
              min={60}
              max={200}
              step={10}
              value={this.state.itemWidth}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ itemWidth: +event.target.value })
              }
            />
          </label>
          <label className="form__label">
            Animation Duration:{'  '}
            <input
              name="animationDuration"
              type="number"
              min={500}
              max={2000}
              step={100}
              value={this.state.animationDuration}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ animationDuration: +event.target.value })
              }
            />
          </label>

          <label className="form__label form__label--align-center">
            {' '}
            Carousel cyclic{' '}
            <input
              type="checkbox"
              name="infinite"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ infinite: event.target.checked })
              }
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
