import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import Form from './components/Form';

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
    infinite: false, // за дефолтом false за ТЗ
  };

  handleWidthChange = (newWidth: number) => {
    this.setState({ itemWidth: newWidth });
  };

  handleSizeChange = (newSize: number) => {
    this.setState({ frameSize: newSize });
  };

  handleStepChange = (newStep: number) => {
    this.setState({ step: newStep });
  };

  handleAnimationChange = (newAnimation: number) => {
    this.setState({ animationDuration: newAnimation });
  };

  handleInfiniteChange = (value: boolean) => {
    this.setState({ infinite: value });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Form
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
          onChangeWidth={this.handleWidthChange}
          onChangeSize={this.handleSizeChange}
          onChangeStep={this.handleStepChange}
          onChangeAnimation={this.handleAnimationChange}
          onChangeInfinite={this.handleInfiniteChange}
        />

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite} // Проп тепер передається!
        />
      </div>
    );
  }
}

export default App;
