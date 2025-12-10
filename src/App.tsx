import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const DEFAULT_STEP = 3;
const DEFAULT_FRAME_SIZE = 3;
const DEFAULT_ITEM_WIDTH = 130;
const DEFAULT_ANIMATION = 1000;

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
    step: DEFAULT_STEP,
    frameSize: DEFAULT_FRAME_SIZE,
    itemWidth: DEFAULT_ITEM_WIDTH,
    animationDuration: DEFAULT_ANIMATION,
    infinite: false,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="Setting">
          <div className="Setting__input">
            <label htmlFor="stepId">Step</label>
            <input
              id="stepId"
              type="number"
              value={this.state.step}
              data-cy="step-input"
              onChange={e =>
                this.setState({ step: Math.max(1, +e.target.value) })
              }
            />
          </div>

          <div className="Setting__input">
            <label htmlFor="frameId">Frame size</label>
            <input
              id="frameId"
              type="number"
              value={this.state.frameSize}
              data-cy="frame-input"
              onChange={e =>
                this.setState({ frameSize: Math.max(1, +e.target.value) })
              }
            />
          </div>

          <div className="Setting__input">
            <label htmlFor="itemId">Item width</label>
            <input
              id="itemId"
              type="number"
              value={this.state.itemWidth}
              data-cy="width-input"
              onChange={e =>
                this.setState({ itemWidth: Math.max(1, +e.target.value) })
              }
            />
          </div>

          <div className="Setting__input">
            <label htmlFor="animationDuration">Animation duration</label>
            <input
              id="animationDuration"
              type="number"
              value={this.state.animationDuration}
              data-cy="duration-input"
              onChange={e =>
                this.setState({
                  animationDuration: Math.max(0, +e.target.value),
                })
              }
            />
          </div>

          <div className="Setting__input">
            <label htmlFor="infinite">Infinite</label>
            <input
              id="infinite"
              type="checkbox"
              checked={this.state.infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </div>
        </div>

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
