import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';
import Control from './components/Control';

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
    properties: {
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
    },
  };

  render() {
    const { images } = this.state;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state.properties;

    return (
      <div className="App">
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
        <Control
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          mainComponent={this}
        />
      </div>
    );
  }
}

export default App;
