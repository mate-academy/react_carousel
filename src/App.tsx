import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images?: string[];
  itemWidth?: number;
  step?: number;
  frameSize?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const smileImages = [
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
];

class App extends React.Component<{}, State> {
  state = {
    images: smileImages,
    itemWidth: 130,
    step: 3,
    frameSize: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ itemWidth: Number(value) });
  };

  handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ frameSize: Number(value) });
  };

  handleChangeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ step: Number(value) });
  };

  handleAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ animationDuration: Number(value) });
  };

  handleInfinity = () => {
    const { infinite } = this.state;

    this.setState({ infinite: !infinite });
  };

  render() {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          transitionDuration={animationDuration}
          step={step}
          infinite={infinite}
        />

        <label>
          {'Item Width: '}
          <input
            type="number"
            name="ItemWidth"
            value={itemWidth}
            onChange={this.handleWidthChange}
            min="100"
            max="400"
          />
        </label>

        <label>
          {'Frame Size: '}
          <input
            type="number"
            name="FrameSize"
            value={frameSize}
            onChange={this.handleFrameSize}
            min={1}
            max={10}
          />
        </label>

        <label>
          {'Carousel step: '}
          <input
            type="number"
            name="Step"
            value={step}
            onChange={this.handleChangeStep}
            min={1}
            max={10}
          />
        </label>

        <label>
          {'Animation duration: '}
          <input
            type="number"
            name="AnimationDuration"
            value={animationDuration}
            onChange={this.handleAnimationDuration}
            min={1}
            max={5000}
          />
        </label>

        <label>
          {'Infinite? '}

          <input
            type="checkbox"
            checked={infinite}
            onClick={this.handleInfinity}
          />
        </label>
      </div>
    );
  }
}

export default App;
