import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { Field } from './components/Field/Field';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  imageSize: number,
  animationDuration: number,
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
    imageSize: 130,
    animationDuration: 1000,
  };

  handleChangeStep = (args: number) => {
    this.setState({ step: args });
  };

  handleChangeFrameSize = (args: number) => {
    this.setState({ frameSize: args });
  };

  handleChangeImageSize = (args: number) => {
    this.setState({ imageSize: args });
  };

  handleChangeAnimDuration = (args: number) => {
    this.setState({ animationDuration: args });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      imageSize,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          imageSize={imageSize}
          animationDuration={animationDuration}
        />

        <Field
          step={step}
          frameSize={frameSize}
          imageSize={imageSize}
          animationDuration={animationDuration}
          onChangeStep={this.handleChangeStep}
          onChangeFrameSize={this.handleChangeFrameSize}
          onChangeImageSize={this.handleChangeImageSize}
          onChangeAnimDuration={this.handleChangeAnimDuration}
        />
      </div>
    );
  }
}

export default App;
