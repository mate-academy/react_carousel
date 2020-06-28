import React from 'react';
import './App.css';

import { Carousel } from './components/Carousel';

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
    initialPosition: 0,
    step: 2,
    frameSize: 3,
    itemWidth: 260,
    animationDuration: 1000,
    translate: 0,
  };

  scrollNext = () => {
    /* eslint-disable-next-line */
    const length = this.state.images.length;
    const position = this.state.initialPosition;
    const frame = this.state.frameSize;
    const width = this.state.itemWidth;
    /* eslint-disable-next-line */
    const step = this.state.step;
    const lastedSmiles = length - position - frame;
    // let leavedSmiles = length - position * step;
    let scroll = 0;

    if (lastedSmiles < step) {
      scroll = width * lastedSmiles;
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition + lastedSmiles,
      }));
    } else {
      scroll = width * step;
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition + step,
      }));
    }

    this.setState(prevState => ({
      translate: prevState.translate + scroll,
    }));
  }

  scrollPrev = () => {
    /* eslint-disable-next-line */
    const length = this.state.images.length;
    const position = this.state.initialPosition;
    const width = this.state.itemWidth;
    /* eslint-disable-next-line */
    const step = this.state.step;
    // const lastSmiles = position;
    let scroll = 0;

    if (position < step) {
      scroll = -(width * position);
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition - position,
      }));
    } else {
      scroll = -(width * step);
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition - step,
      }));
    }

    this.setState(prevState => ({
      translate: prevState.translate + scroll,
    }));
  }

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      translate,
    } = this.state;

    const CarouselWidth = itemWidth * frameSize;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="heading">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          CarouselWidth={CarouselWidth}
          animation={animationDuration}
          next={this.scrollNext}
          prev={this.scrollPrev}
          transform={translate}
          itemWidth={itemWidth}
        />
      </div>
    );
  }
}

export default App;
