import { Component } from 'react';
import { Form } from './components/Form';
import { Carousel } from './components/Carousel';
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
  state = {
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

  handleChangeInfinite = () => {
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
      // defaultNextRest,
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
          handleChangeStep={this.handleChangeStep}
          handleChangeInfinite={this.handleChangeInfinite}
          handleChangeItemWidth={this.handleChangeItemWidth}
          handleChangeFrameSize={this.handleChangeFrameSize}
          handleChangeAnimationDuration={this.handleChangeAnimationDuration}
        />
        <Carousel
          step={step}
          images={images}
          infinite={infinite}
          itemWidth={itemWidth}
          frameSize={frameSize}
          // defaultNextRest={defaultNextRest}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
