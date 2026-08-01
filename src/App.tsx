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
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__controls">
          <label htmlFor="itemId" className="App__input">
            Item Width:{' '}
            <input
              id="itemId"
              type="number"
              value={itemWidth || ''}
              onChange={e =>
                this.setState({ itemWidth: parseInt(e.target.value) })
              }
            />
          </label>

          <label htmlFor="frameId" className="App__input">
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize || ''}
              onChange={e =>
                this.setState({ frameSize: parseInt(e.target.value) })
              }
            />
          </label>

          <label htmlFor="stepId" className="App__input">
            Step:
            <input
              id="stepId"
              type="number"
              value={step || ''}
              onChange={e => this.setState({ step: parseInt(e.target.value) })}
            />
          </label>

          <label htmlFor="animationDuration" className="App__input">
            Animation Duration:
            <input
              id="animationDuration"
              type="number"
              value={animationDuration || ''}
              onChange={e =>
                this.setState({ animationDuration: parseInt(e.target.value) })
              }
            />
          </label>

          <label htmlFor="infinite" className="App__input">
            Infinite:
            <input
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </label>
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
