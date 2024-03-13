import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="App_title">
          Carousel with {images.length} images
        </h1>

        <div className="App_inputs">
          <label htmlFor="stepId">Step:</label>
          <input
            type="number"
            id="stepId"
            value={step}
            min={1}
            onChange={e =>
              this.setState({ step: parseInt(e.target.value, 10) })
            }
          />

          <label htmlFor="frameId">Frame size:</label>
          <input
            type="number"
            id="frameId"
            value={frameSize}
            min={1}
            max={images.length}
            onChange={e =>
              this.setState({ frameSize: parseInt(e.target.value, 10) })
            }
          />

          <label htmlFor="itemId">Item width:</label>
          <input
            type="number"
            id="itemId"
            value={itemWidth}
            onChange={e =>
              this.setState({ itemWidth: parseInt(e.target.value, 10) })
            }
          />

          <label htmlFor="animationDuration">Animation duration:</label>
          <input
            type="number"
            value={animationDuration}
            id="animationDuration"
            onChange={e =>
              this.setState({ animationDuration: parseInt(e.target.value, 10) })
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
