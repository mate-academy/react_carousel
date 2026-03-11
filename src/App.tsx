import './App.scss';
import Carousel from './components/Carousel';
import React from 'react';

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
    const { images, frameSize, step, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="Inputs">
          <label htmlFor="itemId">itemWidth</label>
          <input
            id="itemId"
            type="number"
            onChange={e => this.setState({ itemWidth: Number(e.target.value) })}
          />

          <label htmlFor="frameId">frameSize</label>
          <input
            id="frameId"
            type="number"
            onChange={e => this.setState({ frameSize: Number(e.target.value) })}
          />
          <label htmlFor="stepId">step</label>
          <input
            id="stepId"
            type="number"
            onChange={e => this.setState({ step: Number(e.target.value) })}
          />
          <label htmlFor="animationId">animationDuration</label>
          <input
            id="animationId"
            type="number"
            onChange={e =>
              this.setState({ animationDuration: Number(e.target.value) })
            }
          />
        </div>
        <Carousel
          imagesSrc={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
