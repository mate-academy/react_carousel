import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { CarouselValues } from './types/carousel';

class App extends React.Component<{}, CarouselValues> {
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
    step: 3,
    frameSize: 3,
    animationDuration: 1000,
    infinite: false,
  };

  onChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  onChangeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  onChangeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  onChangeAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  onChangeInfinite = () => {
    this.setState(prevState => ({ infinite: !prevState.infinite }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      step,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel</h1>

        <form className="App__form">
          <label>
            <span>Item width </span>
            <input
              type="number"
              value={itemWidth}
              className="App__input"
              defaultValue={130}
              step={5}
              onChange={this.onChangeWidth}
              min={130}
            />
          </label>

          <label>
            <span>Frame size </span>
            <input
              type="number"
              className="App__input"
              value={frameSize}
              step={1}
              onChange={this.onChangeFrameSize}
              min={1}
            />
          </label>

          <label>
            <span>Step </span>
            <input
              type="number"
              className="App__input"
              value={step}
              onChange={this.onChangeStep}
              min={1}
            />
          </label>

          <label>
            <span>Animation duration </span>
            <input
              className="App__input"
              type="number"
              value={animationDuration}
              onChange={this.onChangeAnimationDuration}
            />
          </label>

          <label>
            <span>Infinite </span>
            <input
              className="App__input"
              type="checkbox"
              checked={infinite}
              onChange={this.onChangeInfinite}
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
