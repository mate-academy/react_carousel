import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number
  infinite: boolean,
}

const defaultState: State = {
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

class App extends React.Component<{}, State> {
  state: Readonly<State> = defaultState;

  handleStepChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(changeEvent.target.value);

    this.setState({ step: value });
  };

  handleItemWidthChange =
  (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(changeEvent.target.value);

    this.setState({ itemWidth: value });
  };

  handleFrameSizeChange =
  (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(changeEvent.target.value);

    this.setState({ frameSize: value });
  };

  handleAnimationDurationChange =
  (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(changeEvent.target.value);

    this.setState({ animationDuration: value });
  };

  handleInfiniteChange =
  (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: changeEvent.target.checked });
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
        <h1 data-cy="title">
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

        <form className="App__form">
          <label htmlFor="itemId" className="App__label">
            {'Item width: '}
            <input
              id="itemId"
              type="number"
              min={10}
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleItemWidthChange}
            />
          </label>

          <label htmlFor="frameId" className="App__label">
            {'Frame size: '}
            <input
              id="frameId"
              type="number"
              min={1}
              max={10}
              name="frameSize"
              value={frameSize}
              onChange={this.handleFrameSizeChange}
            />
          </label>

          <label htmlFor="stepId" className="App__label">
            {'Step: '}
            <input
              id="stepId"
              type="number"
              min={1}
              max={9}
              name="step"
              value={step}
              onChange={this.handleStepChange}
            />
          </label>

          <label className="App__label">
            {'Animation duration: '}
            <input
              type="number"
              min={0}
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleAnimationDurationChange}
            />
          </label>

          <label className="App__label">
            {'Infinite: '}
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
