import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

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

  handleLoop = () => {
    this.setState({ infinite: true });
  };

  handleFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: +e.target.value,
    });
  };

  handleStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +e.target.value });
  };

  handleItemWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +e.target.value });
  };

  handleAnimationDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +e.target.value });
  };

  render() {
    const {
      images, infinite, frameSize, step, itemWidth, animationDuration,
    } = this.state;

    return (
      <div className="App">

        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="main">
          <Carousel
            images={images}
            frameSize={frameSize}
            step={step}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />

          <div className="inputs">
            <label>
              <input type="number" name="step" onChange={this.handleStep} />
              <p>step</p>
            </label>
            <label>
              <input
                type="number"
                name="frameSize"
                onChange={this.handleFrameSize}
              />
              <p>frameSize</p>
            </label>
            <label>
              <input
                type="number"
                name="itemWidth"
                onChange={this.handleItemWidth}
              />
              <p>itemWidth</p>
            </label>
            <label>
              <input
                type="number"
                name="animationDuration"
                onChange={this.handleAnimationDuration}
              />
              <p>animationDuration</p>
            </label>
            <label>
              <input
                type="checkbox"
                name="loop"
                onChange={this.handleLoop}
              />
              <p>infinite</p>
            </label>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
