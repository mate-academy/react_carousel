import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';
import SettingsForm from './components/SettingsForm';

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
    position: 0,
    infinite: false,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
  };

  swipeImages = (direction) => {
    this.setState(() => {
      const { step, itemWidth, frameSize, infinite, images } = this.state;
      const stepWidth = itemWidth * step;
      const frameWidth = itemWidth * frameSize;
      const carouselWidth = itemWidth * images.length;
      const maxPosition = frameWidth - carouselWidth;

      if (direction === 'prev') {
        this.setState((state) => {
          const { position } = state;

          if (position + stepWidth > 0) {
            if (infinite && position === 0) {
              return { position: maxPosition };
            }

            return { position: 0 };
          }

          return { position: position + stepWidth };
        });
      } else {
        this.setState((state) => {
          const { position } = state;

          if (position - (step * itemWidth) < maxPosition) {
            if (infinite && position === maxPosition) {
              return { position: 0 };
            }

            return { position: maxPosition };
          }

          return { position: position - stepWidth };
        });
      }
    });
  };

  onChangeSettings = ({ target }) => {
    const { name, value, type } = target;

    if (type === 'checkbox') {
      this.setState(state => ({
        infinite: !state.infinite,
      }));
    } else if (name === 'frameSize') {
      this.setState({
        [name]: value,
        step: value,
      });
    } else {
      this.setState({
        [name]: +value,
        position: 0,
      });
    }
  }

  render() {
    const {
      images,
      infinite,
      frameSize,
      itemWidth,
      step,
      position,
    } = this.state;

    return (
      <div className="app">
        <h1>Carousel with images</h1>

        <Carousel
          images={images}
          position={position}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={1000}
          infinite={infinite}
          swipeImages={this.swipeImages}
        />
        <SettingsForm
          infinite={infinite}
          toggleInfinite={this.toggleInfinite}
          onChangeSettings={this.onChangeSettings}
        />
      </div>
    );
  }
}

export default App;
