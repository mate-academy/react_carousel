import React from 'react';
import './App.scss';

import Carousel from './components/Carousel/Carousel';
import CarouselSettings from './components/CarouselSettings/CarouselSettings';

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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  editWidth = (event) => {
    return this.setState({
      itemWidth: event.target.value,
    });
  }

  editSize = (event) => {
    return this.setState({
      frameSize: event.target.value,
    });
  }

  editStep = (event) => {
    return this.setState({
      step: event.target.value,
    });
  }

  editDuration = (event) => {
    return this.setState({
      animationDuration: event.target.value,
    });
  }

  render() {
    const { 
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
     } = this.state;

    return (
      <div className="App">
        <div className="app">
        <h1 
        style={{textAlign:`center`}}
        >Carousel with {images.length} images
        </h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
        <CarouselSettings
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          editWidth={this.editWidth}
          editSize={this.editSize}
          editStep={this.editStep}
          editDuration={this.editDuration}
        />
        </div>
      </div>
    );
  }
}

export default App;