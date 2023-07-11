import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Value } from './types.tsx/Values';

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
    itemWidth: '130',
    frameSize: '3',
    step: '2',
    animationDuration: '1000',
    infinite: false,
  };

  stateHandler = (value: Value) => {
    this.setState(state => ({
      images: state.images,
      ...value,
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          chengeState={this.stateHandler}
        />
      </div>
    );
  }
}

export default App;
