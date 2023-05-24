import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
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
    infinite: false,
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          step={step}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="form">

          <label htmlFor="inputStep" className="form__input">
            step
            <input
              className="form__input-item"
              type="number"
              defaultValue={step}
              id="inputStep"
              min="1"
              onChange={(even) => {
                this.setState({ step: +even.target.value });
              }}
            />
          </label>

          <label htmlFor="inputFrameSize" className="form__input">
            frameSize
            <input
              className="form__input-item"
              type="number"
              defaultValue={frameSize}
              id="inputFrameSize"
              min="1"
              max={images.length}
              onChange={(even) => {
                this.setState({ frameSize: +even.target.value });
              }}
            />
          </label>

          <label htmlFor="inputItemWidth" className="form__input">
            itemWidth
            <input
              className="form__input-item"
              type="number"
              defaultValue={itemWidth}
              step="10"
              id="inputItemWidth"
              min="1"
              onChange={(even) => {
                this.setState({ itemWidth: +even.target.value });
              }}
            />
          </label>

          <label htmlFor="inputAnimationDuration" className="form__input">
            animationDuration
            <input
              className="form__input-item"
              type="number"
              defaultValue={animationDuration}
              step="500"
              id="inputAnimationDuration"
              min="0"
              onChange={(even) => {
                this.setState({ animationDuration: +even.target.value });
              }}
            />
          </label>

          <label htmlFor="checkboxInfinite" className="form__input">
            infinite
            <input
              id="checkboxInfinite"
              type="checkbox"
              onClick={(event) => {
                this.setState({ infinite: event.currentTarget.checked });
              }}
            />
          </label>

        </form>
      </div>
    );
  }
}

export default App;
