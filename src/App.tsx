import { Component } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Form } from './components/Form';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export class App extends Component<{}, State> {
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      ...state,
      [event.target.name]: +(event.target.value),
    }));
  };

  handleInfinite = () => {
    this.setState(state => ({
      infinite: !state.infinite,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title"> Carousel with {images.length} images </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <Form
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          images={images}
          infinite={infinite}
          handleChange={this.handleChange}
          handleInfinite={this.handleInfinite}
        />
      </div>
    );
  }
}
