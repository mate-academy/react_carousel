import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
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
  };

  handleChangeVariable = (
    e: React.ChangeEvent<HTMLInputElement>,
    variable: keyof State,
  ) => {
    this.setState(prevState => ({
      ...prevState,
      [variable]: +e.target.value,
    }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          duration={animationDuration}
        />
        <div className="inputs-form">
          <label htmlFor="itemId"> Item width:</label>

          <input
            id="itemId"
            type="number"
            name="itemWidth"
            value={this.state.itemWidth}
            min={65}
            max={520}
            onChange={e => this.handleChangeVariable(e, 'itemWidth')}
          />

          <label htmlFor="frameId"> Frame Size:</label>
          <input
            id="frameId"
            type="number"
            name="itemWidth"
            value={this.state.frameSize}
            min={1}
            max={6}
            onChange={e => this.handleChangeVariable(e, 'frameSize')}
          />

          <label htmlFor="stepId"> Step:</label>
          <input
            id="stepId"
            type="number"
            name="itemWidth"
            value={this.state.step}
            onChange={e => this.handleChangeVariable(e, 'step')}
            min={1}
            max={6}
          />

          <label htmlFor="animationId">Animation:</label>
          <input
            id="animationId"
            type="number"
            name="itemWidth"
            value={this.state.animationDuration}
            min={500}
            max={3000}
            onChange={e => this.handleChangeVariable(e, 'animationDuration')}
          />
        </div>
      </div>
    );
  }
}

export default App;
