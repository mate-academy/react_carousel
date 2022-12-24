import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
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
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel width {images.length} images</h1>

        <div className="content">
          <label htmlFor="itemWidth">Please enter ItemWidth: </label>
          <input
            className="input"
            name="itemWidth"
            min={100}
            max={200}
            type="number"
            id="itemWidth"
            value={itemWidth}
            onChange={this.handle}
          />
          <br />
          <label htmlFor="frameSize">Please enter FrameSize: </label>
          <input
            className="input"
            name="frameSize"
            type="number"
            id="frameSize"
            value={frameSize}
            onChange={this.handle}
          />
          <br />
          <label htmlFor="step">Please enter step: </label>
          <input
            className="input"
            name="step"
            type="number"
            id="step"
            value={step}
            onChange={this.handle}
          />
          <br />
          <label htmlFor="animationDuration">
            Please enter animationDuration:
            {' '}
          </label>
          <input
            className="input"
            name="animationDuration"
            type="number"
            id="animationDuration"
            value={animationDuration}
            onChange={this.handle}
          />
          <br />
          <label htmlFor="animationDuration">Infinite: </label>
          <input
            className="input"
            name="infinite"
            type="checkbox"
            id="infinite"
            onChange={this.handle}
          />

          <Carousel
            images={images}
            itemWidth={itemWidth}
            frameSize={frameSize}
            step={step}
            animationDuration={animationDuration}
            infinite={infinite}
          />
        </div>
      </div>
    );
  }
}

export default App;
