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
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="controls">
          <label className="controls__label" htmlFor="itemId">
            Item width:
            <input
              id="itemId"
              className="controls__input"
              type="number"
              value={itemWidth}
              onChange={e =>
                this.setState({ itemWidth: Number(e.target.value) })
              }
            />
          </label>

          <label className="controls__label" htmlFor="frameId">
            Frame size:
            <input
              id="frameId"
              className="controls__input"
              type="number"
              value={frameSize}
              onChange={e =>
                this.setState({ frameSize: Number(e.target.value) })
              }
            />
          </label>

          <label className="controls__label" htmlFor="stepId">
            Step:
            <input
              id="stepId"
              className="controls__input"
              type="number"
              value={step}
              onChange={e => this.setState({ step: Number(e.target.value) })}
            />
          </label>

          <label className="controls__label">
            Animation duration:
            <input
              className="controls__input"
              type="number"
              value={animationDuration}
              onChange={e =>
                this.setState({ animationDuration: Number(e.target.value) })
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
