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

    const handleItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ itemWidth: +event.target.value });
    };

    const handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ frameSize: +event.target.value });
    };

    const handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ step: +event.target.value });
    };

    const handleAnimationDuration = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      this.setState({ animationDuration: +event.target.value });
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="inputs-wrapper">
          <label htmlFor="itemWidth">
            {'Item Width '}
            <input
              id="itemWidth:"
              type="number"
              value={itemWidth}
              min={120}
              step={10}
              onChange={handleItemWidth}
            />
          </label>
          <label htmlFor="frameSize">
            {'Frame Size: '}
            <input
              id="frameSize"
              type="number"
              value={frameSize}
              onChange={handleFrameSize}
              min={1}
            />
          </label>
          <label htmlFor="step">
            {'Step: '}
            <input
              id="step"
              type="number"
              value={step}
              onChange={handleStep}
              min={1}
            />
          </label>
          <label htmlFor="animationDuration">
            {'Animation Duration: '}
            <input
              id="animationDuration"
              type="number"
              value={animationDuration}
              onChange={handleAnimationDuration}
              min={1000}
              step={500}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
