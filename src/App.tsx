import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [id]: +value,
    }));
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="App__inputs-container">
          <label htmlFor="itemWidth" className="App__label">
            Item width:
            <input
              id="itemWidth"
              type="number"
              className="App__input"
              defaultValue={130}
              step={10}
              min={100}
              max={250}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="frameSize" className="App__label">
            Frame size:
            <input
              id="frameSize"
              type="number"
              className="App__input"
              defaultValue={3}
              min={1}
              max={10}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="step" className="App__label">
            Step:
            <input
              id="step"
              type="number"
              className="App__input"
              defaultValue={3}
              min={1}
              max={10}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="animationDuration" className="App__label">
            Animation duration:
            <input
              id="animationDuration"
              type="number"
              className="App__input"
              defaultValue={1000}
              step={10}
              min={0}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="infinite" className="App__label">
            Infinite:
            <input
              id="infinite"
              type="checkbox"
              className="App__input"
              onChange={(event) => this.setState({
                infinite: event.target.checked,
              })}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
