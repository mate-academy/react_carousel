import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Props } from './type/Props';

class App extends React.Component<{}, Required<Props>> {
  state: Required<Props> = {
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
        <div className="inputGroup">
          <label htmlFor="itemId">
            Item Width:
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            />
          </label>
          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize}
              max={images.length}
              onChange={e => this.setState({ frameSize: +e.target.value })}
            />
          </label>
          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              value={step}
              max={images.length}
              onChange={e => this.setState({ step: +e.target.value })}
            />
          </label>
          <label>
            Animation Duration (ms):
            <input
              type="number"
              value={animationDuration}
              onChange={e =>
                this.setState({ animationDuration: +e.target.value })
              }
            />
          </label>
          <label className="checkbox-label">
            Turn on infinite Carousel
            <input
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
