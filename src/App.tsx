import { Component } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
}

class App extends Component<{}, State> {
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

  changeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.currentTarget.value });
  };

  changeFrameSide = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.currentTarget.value });
  };

  changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.currentTarget.value });
  };

  changeAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.currentTarget.value });
  };

  changeInfinite = () => {
    this.setState(prevState => (
      { infinite: !prevState.infinite }
    ));
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

        <div className="generator">
          <div className="generator-field">
            <label
              htmlFor="itemId"
              className="generator-field__name"
            >
              Item width:
            </label>
            <output>{itemWidth}</output>
            <input
              id="itemId"
              className="generator-field__input"
              defaultValue={itemWidth}
              type="range"
              min={50}
              max={300}
              step={10}
              onChange={this.changeItemWidth}
            />
          </div>
          <div className="generator-field">
            <label
              htmlFor="frameId"
              className="generator-field__name"
            >
              Frame size:
            </label>
            <output>{frameSize}</output>
            <input
              className="generator-field__input"
              defaultValue={frameSize}
              type="range"
              min={1}
              max={5}
              onChange={this.changeFrameSide}
              id="frameId"
            />
          </div>
          <div className="generator-field">
            <label
              htmlFor="stepId"
              className="generator-field__name"
            >
              Step:
            </label>
            <output>{step}</output>
            <input
              className="generator-field__input"
              defaultValue={step}
              type="range"
              min={1}
              max={5}
              onChange={this.changeStep}
              id="stepId"
            />
          </div>
          <div className="generator-field">
            <label
              htmlFor="durationId"
              className="generator-field__name"
            >
              Animation duration:
            </label>
            <output>{animationDuration}</output>
            <input
              className="generator-field__input"
              defaultValue={animationDuration}
              type="range"
              min={500}
              max={3000}
              step={500}
              onChange={this.changeAnimationDuration}
              id="durationId"
            />
          </div>
          <div className="generator-field">
            <label
              htmlFor="infiniteId"
              className="generator-field__name"
            >
              Infinite:
            </label>
            <input
              className="generator-field__input"
              defaultChecked={infinite}
              onChange={this.changeInfinite}
              type="checkbox"
              id="infiniteId"
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
