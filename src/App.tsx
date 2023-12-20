import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import Settings from './components/settings/Settings';

interface State {
  images: string[];
  width: number;
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
    width: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'infinite') {
      this.setState((prevState) => ({ infinite: !prevState.infinite }));

      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  };

  render() {
    const {
      images,
      width,
      frameSize,
      step,
      animationDuration,
      infinite,
    }
      = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Settings
          width={width}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
          handleChange={this.handleChange}
        />

        <Carousel
          images={images}
          width={width}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
