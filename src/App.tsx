import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type DefaultValues = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const defaultValues: DefaultValues = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
};

type State = DefaultValues & {
  images: string[];
};

class App extends React.Component<{}, State> {
  state: State = {
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
    step: defaultValues.step,
    frameSize: defaultValues.frameSize,
    itemWidth: defaultValues.itemWidth,
    animationDuration: defaultValues.animationDuration,
    infinite: defaultValues.infinite,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof this.state;

    this.setState({
      [name]: +event.target.value,
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form method="POST" action="#" className="control-panel">
          <label htmlFor="itemId" className="control-panel__line-block">
            Item Width:
            <input
              id="itemId"
              name="itemWidth"
              min="50"
              step="10"
              className="control-panel__input"
              value={itemWidth}
              onChange={this.handleChange}
              type="number"
            />
          </label>

          <label htmlFor="frameId" className="control-panel__line-block">
            Frame Size:
            <input
              id="frameId"
              name="frameSize"
              min="1"
              max={images.length}
              className="control-panel__input"
              value={frameSize}
              onChange={this.handleChange}
              type="number"
            />
          </label>

          <label htmlFor="stepId" className="control-panel__line-block">
            Step:
            <input
              id="stepId"
              name="step"
              min="1"
              className="control-panel__input"
              value={step}
              onChange={this.handleChange}
              type="number"
            />
          </label>

          <label
            htmlFor="animationDuration"
            className="control-panel__line-block"
          >
            Animation Duration:
            <input
              id="animationDuration"
              name="animationDuration"
              min="100"
              step="100"
              className="control-panel__input"
              value={animationDuration}
              onChange={this.handleChange}
              type="number"
            />
          </label>

          <label htmlFor="infinite">
            * infinite
            <input
              id="infinite"
              name="infinite"
              checked={infinite}
              onChange={() => this.setState({ infinite: !infinite })}
              type="checkbox"
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
