import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
  gap: number,
  images: string[],
}

class App extends React.Component<{}, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    gap: 10,
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
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    stateName: string,
  ) => {
    const stateProperty = {
      [stateName]: +event.target.value,
    } as unknown as Pick<State, keyof State>;

    this.setState(stateProperty);
  };

  handleInfinite = () => {
    const infiniteStatus = this.state.infinite;

    this.setState({ infinite: !infiniteStatus });
  };

  render() {
    const {
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
      gap,
      images,
    } = this.state;

    const widthInput = (
      <input
        className="input"
        type="number"
        value={itemWidth}
        name="itemWidth"
        min="100"
        max="200"
        onChange={(event) => this.handleChange(event, 'itemWidth')}
      />
    );

    const frameSizeInput = (
      <input
        className="input frameSizeInput"
        type="number"
        value={frameSize}
        name="frameSize"
        onChange={(event) => this.handleChange(event, 'frameSize')}
        min="1"
        max={images.length}
      />
    );

    const stepInput = (
      <input
        className="input stepInput"
        type="number"
        value={step}
        name="frameSize"
        onChange={(event) => this.handleChange(event, 'step')}
        min="1"
        max={images.length}
      />
    );

    const animationInput = (
      <input
        className="input"
        type="number"
        value={animationDuration}
        name="animationDuration"
        onChange={(event) => this.handleChange(event, 'animationDuration')}
        min="0"
      />
    );

    const infiniteInput = (
      <input
        className="input"
        type="checkbox"
        name="infinite"
        onChange={this.handleInfinite}
      />
    );

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          gap={gap}
        />

        <form method="get" className="form">
          {'Width: '}
          {widthInput}

          {'Frame Size: '}
          {frameSizeInput}

          {'Step: '}
          {stepInput}

          {'Animation Duration: '}
          {animationInput}

          {'Infinite: '}
          {infiniteInput}
        </form>
      </div>
    );
  }
}

export default App;
