import React from 'react';
import './styles/App.scss';
import { Carousel } from './components/Carousel';
import { CarouselState } from './types/CarouselState';

type State = CarouselState;

export class App extends React.Component<{}, State> {
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
    infinity: false,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className='App__title' data-cy='title'>Carousel with {images.length} images</h1>
        <form
          className="App__form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label>
            Item width:
            <input
              name="itemWidth"
              type="number"
              value={itemWidth}
              onChange={(event) => {
                this.setState({ itemWidth: +event.target.value });
              }}
            />
          </label>
          <label>
            Frame Size:
            <input
              name="frameSize"
              type="number"
              value={frameSize}
              onChange={(event) => {
                this.setState({ frameSize: +event.target.value });
              }}
            />
          </label>
          <label>
            Step:
            <input
              name="step"
              type="number"
              value={step}
              onChange={(event) => {
                this.setState({ step: +event.target.value });
              }}
            />
          </label>
          <label>
            Animation duration:
            <input
              name="animationDuration"
              type="number"
              value={animationDuration}
              onChange={(event) => {
                this.setState({ animationDuration: +event.target.value });
              }}
            />
          </label>
          <label>
            Infinity:
            <input
              name="infinit"
              type="checkbox"
              checked={infinity}
              onChange={(event) => {
                this.setState({ infinity: event.target.checked });
              }}
            />
          </label>

        </form>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinity={infinity}
        />
      </div>
    );
  }
}
