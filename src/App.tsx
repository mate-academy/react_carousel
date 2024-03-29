import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
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
  };

  changeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    return this.setState({
      ...this.state,
      itemWidth: +event.target.value,
    });
  };

  changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    return this.setState({
      ...this.state,
      frameSize: +event.target.value,
    });
  };

  changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    return this.setState({
      ...this.state,
      step: +event.target.value,
    });
  };

  changeAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    return this.setState({
      ...this.state,
      animationDuration: +event.target.value,
    });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App toCenter">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="inputs-container">
          <label htmlFor="itemId">Width:</label>{' '}
          <input
            id="itemId"
            type="number"
            min={100}
            max={200}
            value={itemWidth}
            onChange={this.changeWidth}
          ></input>{' '}
          <label htmlFor="frameId">Number:</label>{' '}
          <input
            id="frameId"
            type="number"
            min={1}
            max={10}
            value={frameSize}
            onChange={this.changeFrameSize}
          ></input>{' '}
          <label htmlFor="stepId">Step:</label>{' '}
          <input
            id="stepId"
            type="number"
            min={1}
            max={10}
            value={step}
            onChange={this.changeStep}
          ></input>{' '}
          <label htmlFor="animationDuration">Scrolling speed:</label>{' '}
          <input
            id="animationDuration"
            type="number"
            min={0}
            max={5000}
            value={animationDuration}
            onChange={this.changeAnimationDuration}
          ></input>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          step={step}
          frameSize={frameSize}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
