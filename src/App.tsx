import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';

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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'itemId':
        this.setState({ itemWidth: +event.target.value });
        break;
      case 'frameId':
        this.setState({ frameSize: +event.target.value });
        break;
      case 'stepId':
        this.setState({ step: +event.target.value });
        break;
      case 'animationDuration':
        this.setState({ animationDuration: +event.target.value });
        break;

      case 'infinite':
        this.setState((prevState) => ({
          infinite: !prevState.infinite,
        }));
        break;

      default:
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
      infinite,
    } = this.state;

    const { handleInputChange } = this;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form action="#" className="carousel-form">
          <label
            htmlFor="itemId"
            className="carousel-form__label"
          >
            Item ID
          </label>
          <input
            type="number"
            id="itemId"
            name="itemId"
            className="carousel-form__input"
            value={itemWidth}
            onChange={handleInputChange}
          />

          <label
            htmlFor="frameId"
            className="carousel-form__label"
          >
            Frame size
          </label>
          <input
            type="number"
            id="frameId"
            name="frameId"
            className="carousel-form__input"
            value={frameSize}
            onChange={handleInputChange}
          />

          <label
            htmlFor="stepId"
            className="carousel-form__label"
          >
            Step
          </label>
          <input
            type="number"
            id="stepId"
            name="stepId"
            className="carousel-form__input"
            value={step}
            onChange={handleInputChange}
          />

          <label
            htmlFor="animationDuration"
            className="carousel-form__label"
          >
            Animation duration
          </label>
          <input
            type="number"
            id="animationDuration"
            name="animationDuration"
            className="carousel-form__input"
            value={animationDuration}
            onChange={handleInputChange}
          />

          <label
            htmlFor="infinite"
            className="carousel-form__label"
          >
            Infinite
            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              className="carousel-form__checkbox"
              defaultChecked={infinite}
              onChange={handleInputChange}
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
