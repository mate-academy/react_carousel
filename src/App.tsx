import React from 'react';
import './App.scss';
import { Carousel, IProps } from './components/Carousel';

// inherit type from Props in Carousel file
class App extends React.Component<{}, Required<IProps>> {
  state = {
    // these are default values that can be changed in inputs by user
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
  };

  // honestly using functional components is so much better than classes but ok
  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="title">
          Carousel with {images.length} images
        </h1>

        <form className="changeValues">
          <label htmlFor="itemId">
            Image width:{' '}
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              // change values between 100px and 250px with step of 10
              min={100}
              step={10}
              max={250}
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            />
          </label>

          <label htmlFor="stepId">
            Steps change:{' '}
            <input
              id="stepId"
              type="number"
              value={step}
              min={1}
              max={images.length - 1}
              onChange={e =>
                this.setState({ step: Math.round(+e.target.value) })
              }
            />
          </label>

          <label htmlFor="frameId">
            How much images can you see:{' '}
            <input
              id="frameId"
              type="number"
              value={frameSize}
              min={1}
              max={images.length}
              onChange={e =>
                this.setState({ frameSize: Math.round(+e.target.value) })
              }
            />
          </label>

          <label htmlFor="animationId">
            Speed of the animation:{' '}
            <input
              id="animationId"
              type="number"
              value={animationDuration}
              min={100}
              step={100}
              max={2500}
              onChange={e =>
                this.setState({ animationDuration: +e.target.value })
              }
            />
          </label>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
