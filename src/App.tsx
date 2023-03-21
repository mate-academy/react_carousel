import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  framesize: number,
  itemWidth: number,
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
    framesize: 3,
    itemWidth: 130,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      framesize,
      itemWidth,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="app">
        <h1 className="app__title" data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <form
          className="app__form form"
          action="#"
          method="get"
        >
          <div className="form__field">
            <label className="form__label">
              ItemWidth:
              <input
                className="form__input"
                type="number"
                value={itemWidth}
                onChange={(event) => {
                  this.setState({ itemWidth: +event.currentTarget.value });
                }}
              />
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">
              FrameSize:
              <input
                className="form__input"
                type="number"
                value={framesize}
                max={images.length}
                min="1"
                onChange={(event) => {
                  this.setState({ framesize: +event.currentTarget.value });
                }}
              />
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">
              Step:
              <input
                className="form__input"
                type="number"
                value={step}
                min="1"
                onChange={(event) => {
                  this.setState({ step: +event.currentTarget.value });
                }}
              />
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">
              AnimationDuration:
              <input
                className="form__input"
                type="number"
                min="0"
                value={animationDuration}
                onChange={(event) => {
                  this.setState(
                    { animationDuration: +event.currentTarget.value },
                  );
                }}
              />
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">
              Infinite:
              <input
                className="form__input"
                type="checkbox"
                checked={infinite}
                onChange={(event) => {
                  this.setState({ infinite: event.currentTarget.checked });
                }}
              />
            </label>
          </div>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={framesize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
