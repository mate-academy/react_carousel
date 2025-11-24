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
  state: State = {
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
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="controls">
          <label htmlFor="itemId">Item width: </label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            step={10}
            onChange={e => {
              this.setState({ itemWidth: Number(e.target.value) });
            }}
          />

          <label htmlFor="frameId">Frame size: </label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            step={1}
            min={1}
            max={images.length}
            onChange={e => {
              this.setState({ frameSize: Number(e.target.value) });
            }}
          />

          <label htmlFor="stepId">Step: </label>
          <input
            id="stepId"
            type="number"
            value={step}
            step={1}
            min={1}
            max={images.length}
            onChange={e => {
              this.setState({ step: Number(e.target.value) });
            }}
          />

          <label>
            Animation in second:{' '}
            <input
              type="number"
              value={animationDuration / 1000}
              step={1}
              min={1}
              max={100}
              onChange={e => {
                this.setState({
                  animationDuration: Number(e.target.value) * 1000,
                });
              }}
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
