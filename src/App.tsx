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
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title' className="App_title">Carousel with {images.length} images</h1>
        <form action="" className="App__settings">
          <label htmlFor="itemId">Item width</label>
          <input
            id="itemId"
            min={60}
            max={480}
            type="number"
            value={itemWidth}
            onChange={e => this.setState({ itemWidth: +e.target.value })}
          />

          <label htmlFor="frameId">Frame Size</label>
          <input
            id="frameId"
            type="number"
            max={images.length}
            min={1}
            value={frameSize}
            onChange={e => this.setState({ frameSize: +e.target.value })}
          />

          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            min={1}
            max={5}
            type="number"
            value={step}
            onChange={e => this.setState({ step: +e.target.value })}
          />

          <label htmlFor="animationId">Animation duration</label>
          <input
            min={1}
            max={5000}
            id="animationId"
            type="number"
            value={animationDuration}
            onChange={e =>
              this.setState({ animationDuration: +e.target.value })
            }
          />
          <label htmlFor="infiniteId">Infinite</label>
          <input
            type="checkbox"
            name="infinite"
            id="infiniteId"
            checked={infinite}
            onChange={e => this.setState({ infinite: e.target.checked })}
          />
        </form>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
