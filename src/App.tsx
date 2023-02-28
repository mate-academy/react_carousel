import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

type PropCarousel = (
  'itemWidth'
  | 'frameSize'
  | 'step'
  | 'animationDuration'
);

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

  handlePropsCarousel = (property: PropCarousel, value: number) => {
    switch (property) {
      case 'itemWidth':
        this.setState({
          itemWidth: value,
        });
        break;

      case 'animationDuration':
        this.setState({
          animationDuration: value,
        });
        break;

      case 'frameSize':
        this.setState({
          frameSize: value,
        });
        break;

      case 'step':
        this.setState({
          step: value,
        });
        break;
      default:
        break;
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="form">
          <label htmlFor="itemId">
            <input
              type="number"
              min={0}
              id="itemId"
              defaultValue={itemWidth}
              onChange={(event) => (
                this.handlePropsCarousel(
                  'itemWidth',
                  +event.target.value,
                )
              )}
            />
            <span>slide width in px</span>
          </label>

          <label htmlFor="frameId">
            <input
              defaultValue={frameSize}
              type="number"
              min={1}
              id="frameId"
              onChange={(event) => (
                this.handlePropsCarousel(
                  'frameSize',
                  +event.target.value,
                )
              )}
            />
            <span>slide frame Size</span>
          </label>

          <label htmlFor="stepId">
            <input
              defaultValue={step}
              type="number"
              min={1}
              id="stepId"
              onChange={(event) => (
                this.handlePropsCarousel(
                  'step',
                  +event.target.value,
                )
              )}
            />
            <span>slide step</span>
          </label>

          <label htmlFor="animationId">
            <input
              defaultValue={animationDuration}
              type="number"
              min={0}
              id="animationId"
              onChange={(event) => (
                this.handlePropsCarousel(
                  'animationDuration',
                  +event.target.value,
                )
              )}
            />
            <span>slide animation time</span>
          </label>

        </div>
      </div>
    );
  }
}

export default App;
