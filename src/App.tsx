import React from 'react';
import 'bulma';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { CarouselRules } from './types/CarouselRules';
import { CarouselRulesForm } from './components/CarouselRulesForm';

interface State {
  images: string[];
  carouselRules: CarouselRules;
}

class App extends React.Component<{}, State> {
  state: State = {
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

    carouselRules: {
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
      infinite: false,
    },
  };

  updateCarouselRules = (newRules: CarouselRules) => {
    this.setState((currentState) => ({
      carouselRules: { ...newRules },
      images: currentState.images,
    }));
  };

  render() {
    const { images } = this.state;
    const { carouselRules } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="title has-text-centered pb-6">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={this.state.images}
          carouselRules={carouselRules}
        />

        <CarouselRulesForm
          onSubmit={this.updateCarouselRules}
        />
      </div>
    );
  }
}

export default App;
