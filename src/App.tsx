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
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="form">
          <label htmlFor="itemId" className="form__field">
            Item width:
            <input
              type="number"
              id="itemId"
              name="itemWidth"
              min={50}
              value={itemWidth}
              onChange={event =>
                this.setState({ itemWidth: +event.currentTarget.value })
              }
            />
          </label>

          <label htmlFor="frameId" className="form__field">
            Frame size:
            <input
              type="number"
              id="frameId"
              name="frameSize"
              value={frameSize}
              onChange={event => {
                const newValue = +event.currentTarget.value;

                this.setState({
                  frameSize:
                    newValue < 1
                      ? 1
                      : newValue > images.length - step
                        ? images.length - step
                        : newValue,
                });
              }}
            />
          </label>

          <label htmlFor="stepId" className="form__field">
            Step:
            <input
              type="number"
              id="stepId"
              name="step"
              value={step}
              onChange={event => {
                const newValue = +event.currentTarget.value;

                this.setState({
                  step:
                    newValue < 1
                      ? 1
                      : newValue > images.length - frameSize
                        ? images.length - frameSize
                        : newValue,
                });
              }}
            />
          </label>

          <label className="form__field">
            Animation duration:
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={event =>
                this.setState({
                  animationDuration: +event.currentTarget.value,
                })
              }
            />
          </label>

          <label className="form__checkbox">
            Infinite:
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={() => this.setState({ infinite: !infinite })}
            />
          </label>
        </form>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
