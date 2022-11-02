import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';
import { ControlPanel } from './components/ControlPanel';

interface State {
  images: string[];
}

class App extends React.Component<{}, State> {
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
    itemWidth: 130,
    frameSize: 2,
    step: 2,
    animationDuration: 1000,
  };

  changeOptions = (option: string, value: number) => {
    this.setState(state => (
      {
        ...state,
        [option]: value,
      }
    ));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          imageUrls={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
        <hr />
        <ControlPanel
          imagesCount={images.length}
          defaultFrameSize={frameSize}
          defaultItemWidth={itemWidth}
          defaultStep={step}
          onChangeOptions={this.changeOptions}
          defaultAnimationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
