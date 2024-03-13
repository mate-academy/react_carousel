import React from 'react';
import { Carousel } from './components/Carousel';
import { Form } from './components/Form';
import { CarouselConfig as GlobalCarouselConfig } from './types';
import './App.scss';

type CarouselConfig = Omit<GlobalCarouselConfig, 'containerSize'>;

interface State {
  images: string[];
  inputs: CarouselConfig;
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
    inputs: {
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
      infinite: false,
    },
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;

    this.setState(({ inputs, ...rest }) => ({
      ...rest,
      inputs: {
        ...inputs,
        [name]: type === 'checkbox' ? checked : parseInt(value, 10),
      },
    }));
  };

  render() {
    const { images, inputs } = this.state;
    const CAROUSEL_CONTAINER_SIZE = 1300;

    return (
      <div className="App">
        <h1 className="App__title" data-cy="title">
          Carousel with {images.length} images
        </h1>

        <Carousel
          {...inputs}
          key={Object.values(inputs).join('')}
          className="App__carousel"
          images={images}
          containerSize={CAROUSEL_CONTAINER_SIZE}
        />

        <Form
          {...inputs}
          containerSize={CAROUSEL_CONTAINER_SIZE}
          handleChange={this.handleChange}
          imagesCount={images.length}
        />
      </div>
    );
  }
}

export default App;
