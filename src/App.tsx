import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  visibleRange: { start: number; end: number };
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
    visibleRange: { start: 0, end: 3 },
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      frameSize: +event.target.value,
      visibleRange: { start: 0, end: +event.target.value },
    }));
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  handleAnimationDurationChange =
  (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  handleInfiniteChange = () => {
    this.setState((prevState) => ({ infinite: !prevState.infinite }));
  };

  handleNextClickChange = () => {
    const end = Math.min(this.state.images.length,
      this.state.visibleRange.end + this.state.step);
    const start = end - this.state.frameSize;

    this.setState(() => ({ visibleRange: { start, end } }));
  };

  handlePrevClickChange = () => {
    const start = Math.max(0, this.state.visibleRange.start - this.state.step);
    const end = start + this.state.frameSize;

    this.setState(() => ({ visibleRange: { start, end } }));
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="App__settings">
          <label className="App__label">
            Item width
            <input
              className="App__input"
              type="number"
              value={this.state.itemWidth}
              min="50"
              max="350"
              step="5"
              onChange={this.handleItemWidthChange}
            />
          </label>

          <label className="App__label">
            Frame size
            <input
              className="App__input"
              type="number"
              value={this.state.frameSize}
              min="1"
              max="10"
              onChange={this.handleFrameSizeChange}
            />
          </label>

          <label className="App__label">
            Step
            <input
              className="App__input"
              type="number"
              min="1"
              max={this.state.frameSize}
              value={this.state.step}
              onChange={this.handleStepChange}
            />
          </label>

          <label className="App__label">
            Animation duration
            <input
              className="App__input"
              type="number"
              value={this.state.animationDuration}
              min="0"
              max="5000"
              step="500"
              onChange={this.handleAnimationDurationChange}
            />
          </label>

          <label className="App__label">
            Infinite
            <input
              className="App__checkbox"
              type="checkbox"
              value="Infinite"
              checked={this.state.infinite}
              onChange={this.handleInfiniteChange}
            />
          </label>

        </div>

        <Carousel
          images={images}
          width={this.state.itemWidth}
          frameSize={this.state.frameSize}
          range={this.state.visibleRange}
          nextClick={this.handleNextClickChange}
          prevClick={this.handlePrevClickChange}
          animationDuration={this.state.animationDuration}
        />
      </div>
    );
  }
}

export default App;
