import React from 'react';
import './App.scss';

import { Carousel } from './components/Carousel';
import { CarouselSetting } from './components/CarouselSetting';

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
    infinite: false,
    indexFrame: 0,
    currentPosition: 0,
  };

  handleGetValue = (value, item) => {
    item === 'images'
      ? this.setState({
        images: [...value],
      })
      : this.setState({
        [item]: typeof value === 'string' || typeof value === 'number'
          ? Number(value) : !!value,
      });
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      indexFrame,
      currentPosition,
    } = this.state;

    return (
      <div className="App">
        <h1>Carousel</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          indexFrame={indexFrame}
          currentPosition={currentPosition}
          handleGetValue={this.handleGetValue}
        />

        <CarouselSetting
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          indexFrame={indexFrame}
          currentPosition={currentPosition}
          handleGetValue={this.handleGetValue}
        />
      </div>
    );
  }
}

export default App;
