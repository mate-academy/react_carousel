// App.tsx
import React from 'react';
import Carousel from './components/Carousel';
import './App.scss';

interface AppState {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    images: Array.from({ length: 10 }, (_, i) => `./img/${i + 1}.png`),
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
        <h1 data-cy="title">Carousel</h1>

        <div className="controls">
          <label htmlFor="itemId">itemWidth:</label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => this.setState({ itemWidth: +e.target.value })}
          />

          <label htmlFor="frameId">frameSize:</label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => this.setState({ frameSize: +e.target.value })}
          />

          <label htmlFor="stepId">step:</label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => this.setState({ step: +e.target.value })}
          />

          <label htmlFor="durationId">animationDuration:</label>
          <input
            id="durationId"
            type="number"
            value={animationDuration}
            onChange={e =>
              this.setState({ animationDuration: +e.target.value })
            }
          />

          <label>
            Infinite:
            <input
              type="checkbox"
              checked={infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </label>
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
