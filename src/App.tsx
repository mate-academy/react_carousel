import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
// import { CarouselType } from './types/CarouselType';

class App extends React.Component {
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    error: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, min, max, checked,
    } = event.target;

    if ((+value >= +min && +value <= +max) || (name === 'infinite')) {
      this.setState({ error: false });

      switch (name) {
        case 'itemWidth':
          this.setState({ itemWidth: +value });
          break;

        case 'frameSize':
          this.setState({ frameSize: +value });
          break;

        case 'step':
          this.setState({ step: +value });
          break;

        case 'animationDuration':
          this.setState({ animationDuration: +value });
          break;

        case 'infinite':
          this.setState({ infinite: checked });
          break;

        default:
          return 0;
      }
    } else {
      this.setState({ error: true });
    }

    return this.state;
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      error,
    } = this.state;

    return (
      <div className="App page__App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form
          action="#"
          method="GET"
          className="Option App__Option"
        >
          {error
            ? <h2 className="Option__error">Enter correct values</h2>
            : <h2>Select options</h2>}

          <label className="Option__title">
            Picture size (50 - 500)px
            <input
              name="itemWidth"
              className="Option__input"
              type="number"
              placeholder={String(itemWidth)}
              min="50"
              max="500"
              onChange={this.handleChange}
            />
          </label>

          <label className="Option__title">
            Amount pictures to show (1 - 10)
            <input
              name="frameSize"
              className="Option__input"
              type="number"
              placeholder={String(frameSize)}
              min="1"
              max="10"
              onChange={this.handleChange}
            />
          </label>

          <label className="Option__title">
            Amount pictures to scroll (1 - 10)
            <input
              name="step"
              className="Option__input"
              type="number"
              placeholder={String(step)}
              min="1"
              max="10"
              onChange={this.handleChange}
            />
          </label>

          <label className="Option__title">
            Time to scroll (0 - 5000)ms
            <input
              name="animationDuration"
              className="Option__input"
              type="number"
              placeholder={String(animationDuration)}
              min="0"
              max="5000"
              onChange={this.handleChange}
            />
          </label>

          <label className="Option__title">
            Infinite scroll
            <input
              name="infinite"
              className="Option__input"
              type="checkbox"
              checked={infinite}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
