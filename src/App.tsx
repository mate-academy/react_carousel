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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="controls">
          <label htmlFor="stepId">
            step
            <input
              type="number"
              id="stepId"
              value={step}
              onChange={event =>
                this.setState({ step: Number(event.target.value) })
              }
            />
          </label>

          <label htmlFor="itemId">
            itemWidth
            <input
              type="number"
              id="itemId"
              value={itemWidth}
              onChange={event =>
                this.setState({ itemWidth: Number(event.target.value) })
              }
            />
          </label>

          <label htmlFor="frameId">
            frameSize
            <input
              type="number"
              id="frameId"
              value={frameSize}
              onChange={event =>
                this.setState({ frameSize: Number(event.target.value) })
              }
            />
          </label>

          <label htmlFor="animationDurationId">
            animationDuration
            <input
              type="number"
              id="animationDurationId"
              value={animationDuration}
              onChange={event =>
                this.setState({ animationDuration: Number(event.target.value) })
              }
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
