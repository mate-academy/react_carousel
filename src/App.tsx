import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    infinite: false,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="input">
          <div className="input__wrapper">
            <label className="input__label" htmlFor="itemId">
              Item width:
            </label>
            <input
              value={itemWidth}
              onChange={event =>
                this.setState({ itemWidth: +event.target.value })
              }
              className="input__input"
              id="itemId"
              type="number"
            />
          </div>

          <div className="input__wrapper">
            <label className="input__label" htmlFor="frameId">
              Frame size:
            </label>
            <input
              value={frameSize}
              onChange={event =>
                this.setState({ frameSize: +event.target.value })
              }
              className="input__input"
              id="frameId"
              type="number"
            />
          </div>

          <div className="input__wrapper">
            <label className="input__label" htmlFor="stepId">
              Step:
            </label>
            <input
              value={step}
              onChange={event => this.setState({ step: +event.target.value })}
              className="input__input"
              id="stepId"
              type="number"
            />
          </div>

          <div className="input__wrapper">
            <label className="input__label" htmlFor="animationDuration">
              Animation duration:
            </label>
            <input
              value={animationDuration}
              onChange={event =>
                this.setState({ animationDuration: +event.target.value })
              }
              className="input__input"
              id="animationDuration"
              type="number"
            />
          </div>

          <div className="input__wrapper">
            <label className="input__label" htmlFor="infinite">
              Animation duration:
            </label>
            <input
              checked={infinite}
              onChange={event =>
                this.setState({ infinite: event.target.checked })
              }
              className="input__input"
              id="infinite"
              type="checkbox"
            />
          </div>
        </div>
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
