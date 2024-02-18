import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export interface State {
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
    step: 2,
    animationDuration: 1000,
    infinite: false,
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
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <form className="App__form">
          <label htmlFor="itemWidth" className="App__label">
            Item width
            <input
              className="App__input"
              type="number"
              id="itemWidth"
              defaultValue={itemWidth}
              onChange={event => this.setState({
                itemWidth: +event.target.value,
              })}
            />
          </label>

          <label htmlFor="frameSize" className="App__label">
            Frame size
            <input
              className="App__input"
              type="number"
              min={1}
              max={10}
              id="frameSize"
              defaultValue={frameSize}
              onChange={event => this.setState({
                frameSize: +event.target.value,
              })}
            />
          </label>

          <label htmlFor="step" className="App__label">
            Step
            <input
              className="App__input"
              type="number"
              id="step"
              defaultValue={step}
              min={1}
              max={10}
              onChange={event => this.setState({
                step: +event.target.value,
              })}
            />
          </label>

          <label htmlFor="animationDuration" className="App__label">
            Animation duration
            <input
              className="App__input"
              type="number"
              id="animationDuration"
              defaultValue={animationDuration}
              onChange={event => this.setState({
                animationDuration: +event.target.value,
              })}
            />
          </label>

          <label htmlFor="infinite">
            Infinite
            <input
              className="App__input App__input--checkbox"
              type="checkbox"
              id="infinite"
              checked={infinite}
              onChange={(event) => this.setState({
                infinite: event.target.checked,
              })}
            />
          </label>
        </form>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
