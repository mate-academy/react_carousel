import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="inputs__container">
          <div className="inputs__wrapper">
            <label htmlFor="itemId" className="inputs__label">
              Item Width:
            </label>

            <input
              type="number"
              className="inputs__input"
              min="1"
              id="itemId"
              value={itemWidth}
              onChange={event =>
                this.setState({ itemWidth: Number(event.target.value) })
              }
            />
          </div>

          <div className="inputs__wrapper">
            <label htmlFor="frameId" className="inputs__label">
              Number of Items:
            </label>

            <input
              type="number"
              className="inputs__input"
              min="1"
              max="10"
              id="frameId"
              value={frameSize}
              onChange={event =>
                this.setState({ frameSize: Number(event.target.value) })
              }
            />
          </div>

          <div className="inputs__wrapper">
            <label htmlFor="stepId" className="inputs__label">
              Step:
            </label>

            <input
              type="number"
              className="inputs__input"
              min="1"
              max="9"
              id="stepId"
              value={step}
              onChange={event =>
                this.setState({ step: Number(event.target.value) })
              }
            />
          </div>

          <div className="inputs__wrapper">
            <label htmlFor="animationDuration" className="inputs__label">
              Duration of Animation:
            </label>

            <input
              type="number"
              className="inputs__input"
              min="1"
              id="animationDuration"
              value={animationDuration}
              onChange={event =>
                this.setState({ animationDuration: Number(event.target.value) })
              }
            />
          </div>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
