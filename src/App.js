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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  scrollNext = () => {
    /* eslint-disable-next-line */
    const length = this.state.images.length;
    const position = this.state.initialPosition;
    /* eslint-disable-next-line */
    const step = this.state.step;
    // const currentPosition = position * step + step;
    const leavedSmiles = length - position * step - step;

    if (leavedSmiles < step) {
      this.setState({
        step: leavedSmiles,
      });
    } else if (leavedSmiles === 0) {
      return false;
    } else {
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition + 1,
      }));
    }
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      initialPosition,
    } = this.state;
    // console.log(images.length, initialPosition, (images.length - initialPosition * step - step));

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
        />
      </div>
    );
  }
}

export default App;
