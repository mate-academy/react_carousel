import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

type State = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

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

  handlerOfInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currenValue = +(event.currentTarget.value);
    const { id } = event.currentTarget;

    switch (id) {
      case 'step':
        this.setState({ step: currenValue });
        break;
      case 'itemWidth':
        this.setState({ itemWidth: currenValue });
        break;
      case 'frameSize':
        this.setState({ frameSize: currenValue });
        break;
      case 'animationDuration':
        this.setState({ animationDuration: currenValue });
        break;
      case 'infinite':
        this.setState(prevState => ({ infinite: !prevState.infinite }));
        break;
      default:
        break;
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1
          data-cy="title"
          className="App__title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <form className="App__form">
          <label htmlFor="itemWidth" className="App__label">
            <span className="App__inputName">item width:</span>

            <input
              type="number"
              id="itemWidth"
              className="App__input"
              min="50"
              max="500"
              step="10"
              defaultValue={itemWidth}
              onChange={this.handlerOfInput}
            />
          </label>

          <label htmlFor="frameSize" className="App__label">
            <span className="App__inputName">frame size:</span>

            <input
              type="number"
              id="frameSize"
              className="App__input"
              min="1"
              max="10"
              defaultValue={frameSize}
              onChange={this.handlerOfInput}
            />
          </label>

          <label htmlFor="step" className="App__label">
            <span className="App__inputName">step:</span>

            <input
              type="number"
              id="step"
              className="App__input"
              min="1"
              max="5"
              defaultValue={step}
              onChange={this.handlerOfInput}
            />
          </label>

          <label htmlFor="animationDuration" className="App__label">
            <span className="App__inputName">animation duration:</span>

            <input
              type="number"
              id="animationDuration"
              className="App__input"
              min="100"
              max="3000"
              step="100"
              defaultValue={animationDuration}
              onChange={this.handlerOfInput}
            />
          </label>

          <label htmlFor="infinite" className="App__label">
            <span className="App__inputName">infinite:</span>

            <input
              type="checkbox"
              id="infinite"
              className="App__input--checkbox"
              defaultValue={`${infinite}`}
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
