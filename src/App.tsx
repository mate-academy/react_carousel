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

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" >Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <form className="Settings">
          <label htmlFor="stepId" className="Settings__label">
            Step:
            <input
              id="stepId"
              className="Settings__input"
              type="number"
              value={step}
              onChange={e => this.setState({ step: +e.target.value })}
              max={6}
              min={1}
            />
          </label>
          <label htmlFor="frameId" className="Settings__label">
            Frame Size:
            <input
              id="frameId"
              className="Settings__input"
              type="number"
              value={frameSize}
              onChange={e => this.setState({ frameSize: +e.target.value })}
              max={4}
              min={1}
            />
          </label>
          <label htmlFor="itemId" className="Settings__label">
            Item Width:
            <input
              id="itemId"
              className="Settings__input"
              type="number"
              value={itemWidth}
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            />
          </label>
          <label htmlFor="animationDurationId" className="Settings__label">
            Animation Duration:
            <input
              id="animationDurationId"
              className="Settings__input"
              type="number"
              value={animationDuration}
              onChange={e =>
                this.setState({ animationDuration: +e.target.value })
              }
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
