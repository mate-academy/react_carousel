import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case 'step':
        this.setState({ step: +value });
        break;

      case 'frameSize':
        this.setState({ frameSize: +value });
        break;

      case 'itemWidth':
        this.setState({ itemWidth: +value });
        break;

      case 'animationDuration':
        this.setState({ animationDuration: +value });
        break;

      case 'infinite':
        this.setState((state) => ({ infinite: !state.infinite }));
        break;

      default:
        break;
    }
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
        <h1 className="App__title">
          {`Carousel with ${images.length} images`}
        </h1>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="Carousel__form">
          <label
            htmlFor="step"
            className="Carousel__label"
          >
            Step
            <input
              id="step"
              type="number"
              className="Carousel__input"
              value={step}
              min={1}
              max={10}
              onChange={this.onChange}
            />
          </label>

          <label
            htmlFor="frameSize"
            className="Carousel__label"
          >
            Frame Size
            <input
              id="frameSize"
              type="number"
              className="Carousel__input"
              value={frameSize}
              min={1}
              max={10}
              onChange={this.onChange}
            />
          </label>

          <label
            htmlFor="itemWidth"
            className="Carousel__label"
          >
            Image Width
            <input
              id="itemWidth"
              type="number"
              className="Carousel__input"
              value={itemWidth}
              min={50}
              max={300}
              step={10}
              onChange={this.onChange}
            />
          </label>

          <label
            htmlFor="animationDuration"
            className="Carousel__label"
          >
            Animation duration
            <input
              id="animationDuration"
              type="number"
              className="Carousel__input"
              value={animationDuration}
              min={300}
              max={3000}
              step={100}
              onChange={this.onChange}
            />
          </label>

          <div>
            <input
              id="infinite"
              className="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.onChange}
            />
            <label
              id="label"
              className="Carousel__label"
              htmlFor="infinite"
            >
              Infinite
            </label>
          </div>

        </form>
      </div>
    );
  }
}

export default App;
