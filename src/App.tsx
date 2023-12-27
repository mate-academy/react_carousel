import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
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
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    const handleItemWidthChange
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ itemWidth: +event.target.value });
    };

    const handleFrameSizeChange
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ frameSize: +event.target.value });
    };

    const handleStepChange
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ step: +event.target.value });
    };

    const handleAnimationDurationChange
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ animationDuration: +event.target.value });
    };

    return (
      <div className="App">
        <h1 data-cy="title" className="App__title">
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>

        <div className="App__container">
          <form className="App__form">
            <div className="App__element">
              <label htmlFor="width">Item Width:</label>
              <input
                className="App__input"
                id="width"
                type="number"
                name="width"
                min={50}
                max={390}
                step={10}
                value={itemWidth}
                onChange={handleItemWidthChange}
              />

            </div>

            <div className="App__element">
              <label htmlFor="size">Frame Size:</label>
              <input
                className="App__input"
                type="number"
                name="size"
                id="size"
                value={frameSize}
                min={1}
                max={images.length}
                onChange={handleFrameSizeChange}
              />
            </div>

            <div className="App__element">
              <label htmlFor="step">Step:</label>
              <input
                className="App__input"
                type="number"
                name="step"
                id="step"
                value={step}
                min={1}
                max={10}
                onChange={handleStepChange}
              />
            </div>

            <div className="App__element">
              <label htmlFor="animation">Animation Duration:</label>
              <input
                className="App__input"
                type="number"
                name="animation"
                id="animation"
                value={animationDuration}
                min={100}
                step={100}
                onChange={handleAnimationDurationChange}
              />
            </div>
          </form>
        </div>
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
