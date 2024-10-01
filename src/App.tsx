import React from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
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
        <h1 data-cy="title" className="title is-1">
          Carousel with {images.length} images
        </h1>

        <form className="form">
          <div className="field">
            <label htmlFor="itemId" className="label">
              Item Width:
            </label>

            <input
              id="itemId"
              type="number"
              className="input"
              value={itemWidth}
              min={50}
              max={innerWidth / frameSize / 2}
              onChange={event =>
                this.setState({ itemWidth: +event.target.value })
              }
            />
          </div>

          <div className="field">
            <label htmlFor="frameId" className="label">
              Frame Size:
            </label>

            <input
              id="frameId"
              type="number"
              className="input"
              value={frameSize}
              min={1}
              max={images.length}
              onChange={event =>
                this.setState({ frameSize: +event.target.value })
              }
            />
          </div>

          <div className="field">
            <label htmlFor="stepId" className="label">
              Step:
            </label>

            <input
              id="stepId"
              type="number"
              className="input"
              value={step}
              min={1}
              max={images.length - 1}
              onChange={event => this.setState({ step: +event.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="animationId" className="label">
              Animation Duration (ms):
            </label>

            <input
              id="animationId"
              type="number"
              className="input"
              value={animationDuration}
              min={500}
              step={500}
              onChange={event =>
                this.setState({ animationDuration: +event.target.value })
              }
            />
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              className="mr-2"
              onChange={event =>
                this.setState({ infinite: event.target.checked })
              }
            />
            Is infinite
          </label>
        </form>

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
