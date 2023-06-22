import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
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
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <div>
          <label htmlFor="itemId">
            Item width:
          </label>
          <input
            type="number"
            name="itemWidth"
            id="itemId"
            min={130}
            max={1300}
            step={10}
            value={itemWidth}
            onChange={(e) => (
              this.setState({ itemWidth: Number(e.target.value) })
            )}
          />
        </div>
        <div>
          <label htmlFor="frameId">
            Number of images displayed:
          </label>
          <input
            type="number"
            name="frameSize"
            id="frameId"
            min={1}
            max={10}
            step={1}
            value={frameSize}
            onChange={(e) => (
              this.setState({ frameSize: Number(e.target.value) })
            )}
          />
        </div>
        <div>
          <label htmlFor="stepId">
            Number of images scrolled:
          </label>
          <input
            type="number"
            name="step"
            id="stepId"
            min={1}
            max={10}
            step={1}
            value={step}
            onChange={(e) => (
              this.setState({ step: Number(e.target.value) })
            )}
          />
        </div>
        <div>
          <label htmlFor="animationId">
            Animation duration:
          </label>
          <input
            type="number"
            name="animationDuration"
            id="animationId"
            min={100}
            max={10000}
            step={100}
            value={animationDuration}
            onChange={(e) => (
              this.setState({ animationDuration: Number(e.target.value) })
            )}
          />
        </div>
        <div>
          <label htmlFor="infiniteId">
            Carousel cyclic:
          </label>
          <input
            type="checkbox"
            name="infinite"
            id="infiniteId"
            min={100}
            max={10000}
            step={100}
            checked={infinite}
            onChange={(e) => (
              this.setState({ infinite: e.target.checked })
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
