import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { CarouselSettings } from './components/CarouselSettings';

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
    imagesStart: [
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
    currentPosition: 0,
    handleChange: (field, value) => {
      const { infinite, imagesStart } = this.state;

      this.setState(state => ({ [field]: +value || !state.infinite }));
      if (infinite) {
        this.setState({
          images: [
            ...imagesStart,
          ],
          currentPosition: 0,
        });
      }
    },
  };

  handleClickNext = () => {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      infinite,
      currentPosition,
    } = this.state;
    const maxPosition = (images.length - frameSize) * itemWidth;
    let position = currentPosition - itemWidth * step;

    if (-position > maxPosition && !infinite) {
      position = -maxPosition;
    }

    if (infinite) {
      images.push(...images.splice(0, step));
    }

    this.setState({ currentPosition: position });
  };

  handleClickPrev = () => {
    const {
      images,
      itemWidth,
      step,
      infinite,
      currentPosition,
    } = this.state;
    let position = currentPosition + itemWidth * step;

    if (position > 0 && !infinite) {
      position = 0;
    }

    if (infinite) {
      images.unshift(...images.splice(-step));
    }

    this.setState({ currentPosition: position });
  };

  render() {
    return (
      <div className="App">
        <h1>Carousel</h1>
        <div className="container">
          <button
            type="button"
            className="button prev"
            onClick={this.handleClickPrev}
          >
            {`\u{1F448}`}
          </button>
          <Carousel {...this.state} />
          <button
            type="button"
            className="button next"
            onClick={this.handleClickNext}
          >
            {`\u{1F449}`}
          </button>
        </div>
        <CarouselSettings {...this.state} />
      </div>
    );
  }
}

export default App;
