import React from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';
import { Carousel } from './components/Carousel';
import { CarouselPanel } from './components/CarouselPanel';
import { NewOptions } from './types/newOptions';
import { Options } from './types/options';

interface State {
  images: string[];
  options: Options;
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
    options: {
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
      infinite: false,
    },
  };

  changeOptions = (newProp: NewOptions) => {
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        ...newProp,
      },
    }));
  };

  render() {
    const { images, options } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="title is-2" data-cy="title">Carousel with {images.length} images</h1>

        <Carousel images={images} options={options} />
        <CarouselPanel options={options} changeOptions={this.changeOptions} />
      </div>
    );
  }
}

export default App;
