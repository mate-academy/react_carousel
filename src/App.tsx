import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

class App extends React.Component {
  state = {
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
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemId">Item Width</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={e => this.setState({ itemWidth: +e.target.value })}
        />

        <label htmlFor="frameId">Frame Size</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={e => this.setState({ frameSize: +e.target.value })}
        />

        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={e => this.setState({ step: +e.target.value })}
        />

        <label htmlFor="durationId">Animation Duration</label>
        <input
          id="durationId"
          type="number"
          value={animationDuration}
          onChange={e =>
            this.setState({
              animationDuration: +e.target.value,
            })
          }
        />

        <label>
          <input
            type="checkbox"
            checked={infinite}
            onChange={e => this.setState({ infinite: e.target.checked })}
          />
          Infinite
        </label>

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
