import { Component } from 'react';
import Carousel from './components/Carousel/Carousel';
import { Form } from './components/Form';

import { CarouselProps } from './types/CarouselProps';
import { HandleEvent } from './types/HandleEvent';

import './App.scss';

const images = [
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
];

class App extends Component<{}, CarouselProps> {
  state: Readonly<CarouselProps> = {
    step: '3',
    frameSize: '3',
    itemWidth: '130',
    animationDuration: '1000',
    infinite: false,
  };

  handleChangeItemWidth: HandleEvent = e => {
    const { value } = e.currentTarget;

    this.setState({
      itemWidth: value,
    });
  };

  handleChangeFrameSize: HandleEvent = e => {
    const { value } = e.currentTarget;

    this.setState({
      frameSize: value,
    });
  };

  handleChangeStep: HandleEvent = e => {
    const { value } = e.currentTarget;

    this.setState({
      step: value,
    });
  };

  handleChangeAnimationDuration:HandleEvent = e => {
    const { value } = e.currentTarget;

    this.setState({
      animationDuration: value,
    });
  };

  onChangeInfinite = () => {
    this.setState((prevState) => ({
      infinite: !prevState.infinite,
    }));
  };

  render() {
    const {
      step,
      infinite,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel</h1>
        <Form
          step={step}
          infinite={infinite}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
          onChangeStep={this.handleChangeStep}
          onChangeInfinite={this.onChangeInfinite}
          onChangeItemWidth={this.handleChangeItemWidth}
          onChangeFrameSize={this.handleChangeFrameSize}
          onChangeAnimationDuration={this.handleChangeAnimationDuration}
        />
        <Carousel
          step={step}
          images={images}
          infinite={infinite}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
