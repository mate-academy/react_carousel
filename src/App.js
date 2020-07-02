import React from 'react';
import './App.css';

import { Carousel } from './components/Carousel/Carousel';

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
    translate: 0,
  };

  onNext = () => {
    this.setState(prevState => ({
      translate:
        prevState.translate
        < (prevState.images.length - prevState.frameSize) * prevState.itemWidth
          ? prevState.translate + (prevState.step * prevState.itemWidth)
          : prevState.translate,
    }));
  }

  onPrev = () => {
    this.setState(prevState => ({
      translate: prevState.translate <= 0
        ? 0
        : prevState.translate - (prevState.step * prevState.itemWidth),
    }));
  }

  render() {
    const { images,
      frameSize,
      itemWidth,
      animationDuration,
      translate } = this.state;

    return (
      <div className="App">
        <h1>{`Carousel with ${images.length} images`}</h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          onNext={this.onNext}
          onPrev={this.onPrev}
          translate={translate}
        />
      </div>
    );
  }
}

export default App;
