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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    this.setState(prevState => ({
      ...prevState,
      [name]: +event.target.value,
    }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="App__labels">
          <label htmlFor="itemWidth" className="App__input">
            Set item width:
            <input
              id="WidthId"
              name="itemWidth"
              type="number"
              value={itemWidth}
              className="App__edit"
              onChange={this.handleInputChange}
              min="130"
            />
          </label>
          <label htmlFor="step" className="App__input">
            Set item step:
            <input
              id="stepId"
              name="step"
              type="number"
              value={step}
              className="App__edit"
              onChange={this.handleInputChange}
              min="1"
              max="10"
            />
          </label>
          <label htmlFor="frameSize" className="App__input">
            Set frame size:
            <input
              id="frameId"
              name="frameSize"
              type="number"
              className="App__edit"
              value={frameSize}
              onChange={this.handleInputChange}
              min="1"
              max="10"
            />
          </label>
          <label htmlFor="animationDuration" className="App__input">
            Set animation duration:
            <input
              id="animationDurationId"
              name="animationDuration"
              type="number"
              className="App__edit"
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="infinite" className="App__input">
            Set infinite:
            <input
              id="infiniteId"
              name="infinite"
              type="checkbox"
              checked={infinite}
              className="App__edit"
              onChange={() => this.setState({ infinite: !infinite })}
            />
          </label>
        </div>
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
