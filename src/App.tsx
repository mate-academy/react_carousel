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

    switch (name) {
      case 'itemWidth':
        this.setState({ [name]: +value });
        break;

      case 'frameSize':
        this.setState({ [name]: +value });
        break;

      case 'step':
        this.setState({ [name]: +value });
        break;

      case 'animationDuration':
        this.setState({ [name]: +value });
        break;

      case 'infinite':
        this.setState({ [name]: true });
        break;

      default:
        break;
    }
  };

  render() {
    const {
      images, itemWidth, frameSize, step, animationDuration, infinite,
    }
      = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel width {images.length} images</h1>

        <div className="content">
          <label htmlFor="itemWidth">Please enter ItemWidth: </label>
          <input
            name="itemWidth"
            min={100}
            max={200}
            type="text"
            id="itemWidth"
            value={itemWidth}
            onChange={this.handle}
          />
          <br />
          <label htmlFor="frameSize">Please enter FrameSize: </label>
          <input
            name="frameSize"
            type="text"
            id="frameSize"
            value={frameSize}
            onChange={this.handle}
          />
          <br />
          <label htmlFor="step">Please enter step: </label>
          <input
            name="step"
            type="text"
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
            name="animationDuration"
            type="text"
            id="animationDuration"
            value={animationDuration}
            onChange={this.handle}
          />
          <br />
          <label htmlFor="animationDuration">Infinite: </label>
          <input
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
