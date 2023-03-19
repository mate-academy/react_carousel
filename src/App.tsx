import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
    infinite: false,
  };

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration, infinite,
    } = this.state;

    console.log('frameSize', frameSize);
    console.log('step', step);
    console.log('itemWidth', itemWidth);
    console.log('----------------------------------------');

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={this.state.images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="form">
          <label htmlFor="itemId" className="form__label">
            Item width
            <br />
            <input
              id="itemWidth"
              type="number"
              value={itemWidth}
              min={130}
              onChange={(e) => {
                this.setState({ itemWidth: +e.target.value });
              }}
            />
          </label>
          <label htmlFor="frameId" className="form__label">
            Frame size
            <br />
            <input
              id="frameSize"
              type="number"
              value={frameSize}
              min={1}
              onChange={(e) => {
                this.setState({ frameSize: +e.target.value });
              }}
            />
          </label>
          <label htmlFor="stepId" className="form__label">
            Step
            <br />
            <input
              id="step"
              type="number"
              value={step}
              min={1}
              onChange={(e) => {
                this.setState({ step: +e.target.value });
              }}
            />
          </label>
          <label htmlFor="animationDuration" className="form__label">
            Animation duration
            <br />
            <input
              id="animationDuration"
              type="number"
              value={animationDuration}
              min={0}
              step="1000"
              onChange={(e) => {
                this.setState({ animationDuration: +e.target.value });
              }}
            />
          </label>
          <label
            htmlFor="infinite"
            className="form__label"
            style={{ cursor: 'pointer' }}
          >
            Infinite
            <br />
            <input
              id="infinite"
              type="checkbox"
              onClick={(e) => {
                this.setState({ infinite: e.currentTarget.checked });
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
