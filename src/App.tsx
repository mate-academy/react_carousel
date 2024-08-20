import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface Image {
  url: string;
  altText?: string;
  id?: string;
}

interface State {
  images: Image[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    images: [
      { url: './img/1.png', altText: 'First image' },
      { url: './img/2.png', altText: 'Second image' },
      { url: './img/3.png', altText: 'Third image' },
      { url: './img/4.png', altText: 'Fourth image' },
      { url: './img/5.png', altText: 'Fifth image' },
      { url: './img/6.png', altText: 'Sixth image' },
      { url: './img/7.png', altText: 'Seventh image' },
      { url: './img/8.png', altText: 'Eighth image' },
      { url: './img/9.png', altText: 'Ninth image' },
      { url: './img/10.png', altText: 'Tenth image' },
    ],
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(e.target.value) });
  };

  handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: Number(e.target.value) });
  };

  handleItemWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: Number(e.target.value) });
  };

  handleAnimationDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: Number(e.target.value) });
  };

  handleInfiniteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: e.target.checked });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="form">
          <label className="form__label" htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              min={1}
              max={5}
              value={step}
              onChange={this.handleStepChange}
            />
          </label>

          <label className="form__label" htmlFor="frameId">
            Frame size:
            <input
              id="frameId"
              type="number"
              min={2}
              max={7}
              value={frameSize}
              onChange={this.handleFrameSizeChange}
            />
          </label>

          <label className="form__label" htmlFor="itemId">
            Item width:
            <input
              id="itemId"
              type="number"
              min={50}
              max={200}
              step={10}
              value={itemWidth}
              onChange={this.handleItemWidthChange}
            />
          </label>

          <label className="form__label" htmlFor="animationDurationId">
            Animation duration:
            <input
              id="animationDurationId"
              type="number"
              min={300}
              max={2000}
              step={100}
              value={animationDuration}
              onChange={this.handleAnimationDurationChange}
            />
          </label>

          <label className="form__label" htmlFor="infiniteId">
            Infinite:
            <input
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={this.handleInfiniteChange}
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
