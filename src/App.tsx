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

  changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [id]: +value,
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
        <div className="form">
          <div>
            <label htmlFor="itemWidth">
              Enter width:{' '}
              <input
                type="number"
                id="itemWidth"
                value={itemWidth}
                onChange={this.changeValue}
              />
            </label>
          </div>
          <div>
            <label htmlFor="frameSize">Enter frame size</label>
            <input
              type="number"
              id="frameSize"
              value={frameSize}
              onChange={this.changeValue}
            />
          </div>
          <div>
            <label htmlFor="step">Enter step</label>
            <input
              type="number"
              id="step"
              value={step}
              onChange={this.changeValue}
            />
          </div>
          <div>
            <label htmlFor="animationDuration">Enter animation duration</label>
            <input
              type="number"
              id="animationDuration"
              value={animationDuration}
              onChange={this.changeValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
