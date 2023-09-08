import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: Number(e.target.value),
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
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <form
          action="#"
          method="post"
          className="App__form"
        >
          <label htmlFor="itemWidth">
            Item Width
            <input
              className="App__input"
              id="itemWidth"
              name="itemWidth"
              type="number"
              value={itemWidth}
              min={130}
              max={1300}
              step={10}
              onChange={this.onHandleChange}
            />
          </label>

          <label htmlFor="frameSize">
            Frame Size
            <input
              className="App__input"
              id="frameSize"
              name="frameSize"
              type="number"
              value={frameSize}
              min={1}
              max={10}
              onChange={this.onHandleChange}
            />
          </label>

          <label htmlFor="step">
            Step
            <input
              className="App__input"
              id="step"
              name="step"
              type="number"
              value={step}
              min={1}
              max={7}
              onChange={this.onHandleChange}
            />
          </label>

          <label htmlFor="animationDuration">
            Animation Duration
            <input
              className="App__input"
              id="animationDuration"
              name="animationDuration"
              type="number"
              value={animationDuration}
              min={1000}
              max={10000}
              step={500}
              onChange={this.onHandleChange}
            />
          </label>

          <label htmlFor="infinite">
            Infinite
            <input
              className="App__input"
              id="infinite"
              name="infinite"
              type="checkbox"
              onClick={() => this.setState({
                infinite: !infinite,
              })}
            />
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
