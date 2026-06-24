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
        <h1 data-cy="title">Carousel</h1>

        <div className="App__controls">
          <label htmlFor="itemId" className="App__field">
            Item Width:
            <input
              id="itemId"
              type="number"
              value={itemWidth || ''}
              onChange={e =>
                this.setState({ itemWidth: Number(e.target.value) })
              }
            />
          </label>

          <label htmlFor="frameId" className="App__field">
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize || ''}
              onChange={e =>
                this.setState({ frameSize: Number(e.target.value) })
              }
            />
          </label>

          <label htmlFor="stepId" className="App__field">
            Step:
            <input
              id="stepId"
              type="number"
              value={step || ''}
              onChange={e => this.setState({ step: Number(e.target.value) })}
            />
          </label>

          <label htmlFor="fnimationDurationId" className="App__field">
            Fnimation Duration:
            <input
              id="fnimationDurationId"
              type="number"
              value={animationDuration || ''}
              onChange={e =>
                this.setState({ animationDuration: Number(e.target.value) })
              }
            />
          </label>

          <label className="App__field">
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
