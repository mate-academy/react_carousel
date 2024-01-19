import React from 'react';
import 'bulma';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { CarouselRules } from './types/CarouselRules';
import { CarouselRulesForm } from './components/CarouselRulesForm';
import { initialCarouselRules } from './constants/InitialCarouselRules';

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

    carouselRules: initialCarouselRules,
  };

  updateCarouselRules = (newRules: CarouselRules) => {
    this.setState({ carouselRules: newRules });
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
          initialCarouselRules={carouselRules}
        />
      </div>
    );
  }
}

export default App;
