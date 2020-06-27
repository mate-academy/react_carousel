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
    initialPosition: 3,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    translate: 0,
  };

  scrollNext = () => {
    /* eslint-disable-next-line */
    const length = this.state.images.length;
    const position = this.state.initialPosition;
    const width = this.state.itemWidth;
    /* eslint-disable-next-line */
    const step = this.state.step;
    const lastSmiles = length - position;
    // let leavedSmiles = length - position * step;
    let scroll = 0;
    console.log(position)

    if (lastSmiles < step) {
      scroll = width * lastSmiles;
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition + lastSmiles,
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
    console.log(position)

    if (position - step < step) {
      scroll = -(width * (position - step));
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition - (position - step),
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
      step,
      frameSize,
      itemWidth,
      animationDuration,
      initialPosition,
      translate,
    } = this.state;
    // console.log(images.length, initialPosition, (images.length - initialPosition * step - step));
    // console.log(transform);

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          width={itemWidth}
          animation={animationDuration}
          framesize={frameSize}
          initialPosition={initialPosition}
          next={this.scrollNext}
          prev={this.scrollPrev}
          transform={translate}
        />
      </div>
    );
  }
}

export default App;
