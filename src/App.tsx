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
        <h1 data-cy="title" style={{ textAlign: 'center' }}>
          Carousel with {images.length} images
        </h1>
        <div
          className="controls"
          style={{
            width: '200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label htmlFor="itemId">itemWidth:</label>
          <input
            type="number"
            id="itemId"
            data-cy="data-width"
            value={itemWidth}
            min={0}
            max={260}
            step={10}
            onChange={e => this.setState({ itemWidth: +e.target.value })}
          />
          <label htmlFor="frameId">Frame Size:</label>
          <input
            type="number"
            value={frameSize}
            id="frameId"
            min={1}
            step={1}
            max={images.length}
            onChange={e => this.setState({ frameSize: +e.target.value })}
          />
          <label htmlFor="stepId">Step:</label>
          <input
            type="number"
            id="stepId"
            value={step}
            step={1}
            min={1}
            max={images.length}
            onChange={e => this.setState({ step: +e.target.value })}
          />
          <label htmlFor="animationDuration">Animation Duration:</label>
          <input
            type="number"
            id="animationDuration"
            value={animationDuration}
            onChange={e =>
              this.setState({ animationDuration: +e.target.value })
            }
          />
          <label htmlFor="infinite">Infinite:</label>
          <input
            type="checkbox"
            id="infinite"
            checked={infinite}
            onChange={e => this.setState({ infinite: e.target.checked })}
          />
        </div>

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
