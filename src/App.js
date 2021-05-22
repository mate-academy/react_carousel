import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';

const defaultValues = {
  defaultStep: 3,
  defaultFrameSize: 3,
  defaultItemWidth: 130,
  defaultAnimationDuration: 1000,
  defaultInfiniteValue: true,
};

// enterValues()

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
  };

  render() {
    const { images } = this.state;

    const {
      defaultStep,
      defaultFrameSize,
      defaultItemWidth,
      defaultAnimationDuration,
      defaultInfiniteValue,
    } = defaultValues;

    let step = defaultStep;
    let frameSize = defaultFrameSize;
    let itemWidth = defaultItemWidth;
    let animationDuration = defaultAnimationDuration;
    let infinite = defaultInfiniteValue;

    /* eslint-disable */
    (function setValues() {
      if (confirm('Do you want set custom params of carousel?')) {
        step = +prompt('Set scroll step') || defaultStep;
        frameSize = +prompt('Set number of displayed images')
          || defaultFrameSize;
        itemWidth = +prompt('Set image width') || defaultItemWidth;
        animationDuration = +prompt('Set scroll duration')
          || defaultAnimationDuration;
        infinite = confirm('Do you want infinite carousel?');
      }
    })();
    /* eslint-enable */

    return (
      <div className="App">
        <h1 className="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <button
          className="changing-button"
          type="button"
        >
          Change Carousel
        </button>
      </div>
    );
  }
}

export default App;
