import React from 'react';
import './styles/App.scss';
import { Carousel } from './components/Carousel';
import { CarouselState } from './types/CarouselState';

type State = CarouselState;

type Cases =
  'itemWidth' |
  'frameSize' |
  'step' |
  'animationDuration';

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

  handlerEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      checked,
      min,
      max,
    } = event.target;

    switch (name) {
      case 'itemWidth':
      case 'frameSize':
      case 'step':
      case 'animationDuration':
        this.setState({
          [name]: +value <= +min || +value > +max
            ? +min
            : +value,
        } as { [K in Cases]: number; });
        break;

      default:
        this.setState({ infinity: checked });
        break;
    }
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
        <h1 className="App__title" data-cy="title">
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>
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
              min="100"
              max="300"
              step="10"
              value={itemWidth}
              onChange={this.handlerEvent}
            />
          </label>
          <label>
            Frame Size:
            <input
              name="frameSize"
              type="number"
              value={frameSize}
              min="1"
              max="10"
              onChange={this.handlerEvent}
            />
          </label>
          <label>
            Step:
            <input
              name="step"
              type="number"
              value={step}
              min="1"
              max="9"
              onChange={this.handlerEvent}
            />
          </label>
          <label>
            Animation duration:
            <input
              name="animationDuration"
              type="number"
              value={animationDuration}
              min="0"
              max="5000"
              step="100"
              onChange={this.handlerEvent}
            />
          </label>
          <label>
            Infinity:
            <input
              name="infinit"
              type="checkbox"
              checked={infinity}
              onChange={this.handlerEvent}
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
