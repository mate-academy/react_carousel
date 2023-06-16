import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

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
        <h1
          data-cy="title"
          className="App__title"
        >
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>

        <form
          className="App__labels"
        >
          <label
            htmlFor="widthInputId"
            className="App__label"
          >
            Item Width:
            <input
              id="widthInputId"
              type="number"
              name="widthInput"
              value={itemWidth}
              min={130}
              max={390}
              onChange={(event) => {
                this.setState({
                  itemWidth: +event.currentTarget.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="frameSizeId"
            className="App__label"
          >
            Frame Size:
            <input
              id="frameSizeId"
              type="number"
              name="frameSize"
              value={frameSize}
              min={1}
              max={10}
              onChange={(event) => {
                this.setState({
                  frameSize: +event.currentTarget.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="stepId"
            className="App__label"
          >
            Step:
            <input
              id="stepId"
              type="number"
              name="step"
              value={step}
              min={1}
              max={10}
              onChange={(event) => {
                this.setState({
                  step: +event.currentTarget.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="animationDurationId"
            className="App__label"
          >
            Animation Duration:
            <input
              id="animationDurationId"
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={(event) => {
                this.setState({
                  animationDuration: +event.currentTarget.value,
                });
              }}
            />
          </label>

          <label htmlFor="infiniteId">
            Infinite:
            <input
              id="infiniteId"
              type="checkbox"
              name="infinite"
              onChange={(event) => {
                this.setState({
                  infinite: event.currentTarget.checked,
                });
              }}
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
