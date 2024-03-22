import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { CarouselProps } from './components/types';
import { FormProps } from './components/Form/types';
import { Form } from './components/Form/Form';

interface State {
  carouselProps: CarouselProps;
  formProps: FormProps;
}

class App extends React.Component<{}, State> {
  changeCarouselProps = (key: string, value: number) => {
    const { carouselProps } = this.state;

    if (key in carouselProps && value > 0) {
      this.setState({
        ...this.state,
        carouselProps: { ...carouselProps, [key]: value },
      });
    }
  };

  state = {
    carouselProps: {
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
    },
    formProps: {
      onChange: this.changeCarouselProps,
      inputs: [
        {
          label: 'Image Width',
          id: 'itemId',
          name: 'itemWidth',
          defaultValue: 130,
        },
        {
          label: 'Frame Size',
          id: 'frameId',
          name: 'frameSize',
          defaultValue: 3,
        },
        {
          label: 'Step',
          id: 'stepId',
          name: 'step',
          defaultValue: 3,
        },
        {
          label: 'Animation Time',
          id: 'animationId',
          name: 'animationDuration',
          defaultValue: 1000,
        },
      ],
    },
  };

  render() {
    const { carouselProps, formProps } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {carouselProps.images.length} images</h1>
        <Form {...formProps} />

        <Carousel {...carouselProps} />
      </div>
    );
  }
}

export default App;
