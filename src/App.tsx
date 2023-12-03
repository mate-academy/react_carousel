import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

import { Form } from './components/Form';
import { FormData, State } from './types';

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
  };

  handleSubmit = (formData: FormData) => {
    const {
      itemWidth, frameSize, step, animationDuration,
    } = formData;

    this.setState({
      itemWidth,
      frameSize,
      step,
      animationDuration,
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1  data-cy="title">Carousel</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
        <Form onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
