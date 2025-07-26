import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemId: number;
  frameId: number;
  stepId: number;
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
    stepId: 3,
    frameId: 3,
    itemId: 130,
    animationDuration: 1000,
  };

  handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id !== 'images') {
      this.setState({ [id]: Number(value) } as Omit<State, 'images'>);
    }
  };

  render() {
    const { images, stepId, itemId, frameId, animationDuration } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={stepId}
          frameSize={frameId}
          itemWidth={itemId}
          animationDuration={animationDuration}
          infinite={false}
        />

        <label htmlFor="itemId">itemWidth:</label>
        <input
          id="itemId"
          type="number"
          value={itemId}
          onChange={this.handleChangeInput}
        />

        <label htmlFor="frameId">frameSize:</label>
        <input
          id="frameId"
          type="number"
          value={frameId}
          onChange={this.handleChangeInput}
        />

        <label htmlFor="stepId">step:</label>
        <input
          id="stepId"
          type="number"
          value={stepId}
          onChange={this.handleChangeInput}
        />

        <label htmlFor="animationDuration">animationDuration:</label>
        <input
          id="animationDuration"
          type="number"
          value={animationDuration}
          onChange={this.handleChangeInput}
        />
      </div>
    );
  }
}

export default App;
