import './App.scss';
import React, { ChangeEvent } from 'react';
import { Carousel } from './components/Carousel';

interface State {
  images: string[],
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

  handleEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'infinite') {
      this.setState(state => ({
        [name]: !state.infinite,
      }));
    } else {
      this.setState({ [name]: +value } as any);
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
        <form className="App__form">
          <label className="App__field">
            Step
            <input
              name="step"
              className="App__input"
              type="number"
              onChange={this.handleEvent}
              value={step}
              min="1"
              max="10"
            />
          </label>

          <label className="App__field">
            Frame Size
            <input
              name="frameSize"
              className="App__input"
              type="number"
              onChange={this.handleEvent}
              value={frameSize}
              min="0"
              max="10"
            />
          </label>

          <label className="App__field">
            Item Width
            <input
              name="itemWidth"
              className="App__input"
              type="number"
              onChange={this.handleEvent}
              value={itemWidth}
              min="0"
              max="400"
            />
          </label>

          <label className="App__field">
            Animation Duration
            <input
              name="animationDuration"
              className="App__input"
              type="number"
              onChange={this.handleEvent}
              value={animationDuration}
              min="0"
              max="10000"
            />
          </label>

          <label className="App__field">
            Infinite
            <input
              type="checkbox"
              name="infinite"
              onChange={this.handleEvent}
            />
          </label>

        </form>
      </div>
    );
  }
}

export default App;
