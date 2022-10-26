import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

enum Cases {
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handlerOfInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = +(event.currentTarget.value);
    const { id } = event.currentTarget;

    switch (id) {
      case String(Cases.itemWidth):
        this.setState({ itemWidth: currentValue });
        break;
      case String(Cases.frameSize):
        this.setState({ frameSize: currentValue });
        break;
      case String(Cases.step):
        this.setState({ step: currentValue });
        break;
      case String(Cases.animationDuration):
        this.setState({ animationDuration: currentValue });
        break;
      case String(Cases.infinite):
        this.setState(prevState => ({ infinite: !prevState.infinite }));
        break;
      default:
        break;
    }
  };

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration, infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="App__title">Carousel with {images.length} images</h1>

        <form className="App__form">
          <label htmlFor="itemWidth" className="App__label">
            <span className="App__inputName">Item Width:</span>
            <input
              type="number"
              id="itemWidth"
              className="App__input"
              min="100"
              max="180"
              step="10"
              value={itemWidth}
              onChange={this.handlerOfInput}
            />
          </label>

          <label htmlFor="frameSize" className="App__label">
            <span className="App__inputName">Frame Size:</span>
            <input
              type="number"
              id="frameSize"
              className="App__input"
              min="1"
              max="10"
              value={frameSize}
              onChange={this.handlerOfInput}
            />
          </label>

          <label htmlFor="step" className="App__label">
            <span className="App__inputName">Step:</span>
            <input
              type="number"
              id="step"
              className="App__input"
              value={step}
              min="1"
              max="5"
              onChange={this.handlerOfInput}
            />
          </label>

          <label htmlFor="animationDuration" className="App__label">
            <span className="App__inputName">Animation Duration:</span>
            <input
              type="number"
              id="animationDuration"
              className="App__input"
              min="100"
              max="3000"
              step="100"
              value={animationDuration}
              onChange={this.handlerOfInput}
            />
          </label>

          <label htmlFor="infinite" className="App__label">
            <span className="App__inputName">Infinite:</span>

            <input
              type="checkbox"
              id="infinite"
              className="App__input--checkbox"
              value={String(infinite)}
              onChange={this.handlerOfInput}
            />
          </label>
        </form>

        <Carousel
          images={images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />
      </div>
    );
  }
}

export default App;
