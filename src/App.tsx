import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Form } from './components/Form';

interface State {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
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

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;

    this.setState(state => {
      return {
        ...state,
        [name]: +value,
      };
    });
  };

  render() {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.state;

    return (
      <div className="app">
        {/* eslint-disable-next-line */}
        <h1 className="app__title" data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
        />

        <Form handleInput={this.handleInput} />
      </div>
    );
  }
}

export default App;
