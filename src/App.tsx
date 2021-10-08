import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  step: number,
  infinite: boolean,
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
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    step: 3,
    infinite: false,
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.currentTarget.value;

    this.setState({
      frameSize: newValue,
    });
  };

  setItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.currentTarget.value;

    this.setState({
      itemWidth: newValue,
    });
  };

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.currentTarget.value;

    this.setState({
      animationDuration: newValue,
    });
  };

  setStepSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.currentTarget.value;

    this.setState({
      step: newValue,
    });
  };

  toggleInfinite = () => {
    this.setState((state) => {
      return {
        infinite: !state.infinite,
      };
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      step,
      infinite,
    } = this.state;

    return (
      <div className="container">
        <div className="app">
          <h1>{`Carousel with ${images.length} images`}</h1>

          <Carousel {...this.state} />
          <div>
            Item width:
            {' '}
            <input
              type="number"
              value={itemWidth}
              onChange={this.setItemWidth}
              min={100}
              max={200}
            />
          </div>
          <div>
            Number of images displayed:
            {' '}
            <input
              type="number"
              value={frameSize}
              onChange={this.setFrameSize}
              min={0}
              max={5}
            />
          </div>
          <div>
            Step size:
            {' '}
            <input
              type="number"
              value={step}
              onChange={this.setStepSize}
              min={1}
              max={5}
            />
          </div>
          <div>
            Animation duration:
            {' '}
            <input
              type="number"
              value={animationDuration}
              onChange={this.setAnimationDuration}
              min={500}
              max={5000}
              step={100}
            />
          </div>
          <div>
            Infinite:
            {' '}
            <button
              type="button"
              className="button"
              onClick={this.toggleInfinite}
            >
              {infinite ? 'Turn off' : 'Turn on'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
