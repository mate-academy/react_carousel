import React from 'react';
import './App.scss';

import { Carousel } from './components/Carousel';
import { CarouselCustomizer } from './components/CarouselCustomiser';

class App extends React.Component {
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
    carouselAdjustments: {
      step: 2,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
      infinite: false,
    },
  };

  handleAdjustmentValues = this.handleAdjustmentValues.bind(this);

  handleResetAdjustmentValues = this.handleResetAdjustmentValues.bind(this);

  handleAdjustmentValues(event) {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      carouselAdjustments: {
        ...state.carouselAdjustments,
        [name]: +value,
      },
    }));
  }

  handleResetAdjustmentValues(e) {
    e.preventDefault();
    this.setState({
      carouselAdjustments: {
        step: 2,
        frameSize: 3,
        itemWidth: 130,
        animationDuration: 1000,
        infinite: false,
      },
    });
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={this.state.images}
          step={this.state.carouselAdjustments.step}
          frameSize={this.state.carouselAdjustments.frameSize}
          itemWidth={this.state.carouselAdjustments.itemWidth}
          animationDuration={this.state.carouselAdjustments.animationDuration}
          infinite={this.state.carouselAdjustments.infinite}
          render={() => (
            <CarouselCustomizer
              onchange={this.handleAdjustmentValues}
              carouselAdjustments={this.state.carouselAdjustments}
              reset={this.handleResetAdjustmentValues}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
