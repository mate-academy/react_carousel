import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form action="#">
          <label htmlFor="itemId" className="label">
            Item width:
            <input
              className="input"
              id="itemId"
              type="number"
              value={itemWidth}
              placeholder="130"
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            />
          </label>

          <label htmlFor="stepId" className="label">
            Step size:
            <input
              className="input"
              id="stepId"
              type="number"
              value={step}
              onChange={e => this.setState({ step: +e.target.value })}
            />
          </label>

          <label htmlFor="frameId" className="label">
            Frame size:
            <input
              className="input"
              id="frameId"
              type="number"
              value={frameSize}
              onChange={e => this.setState({ frameSize: +e.target.value })}
            />
          </label>
        </form>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
