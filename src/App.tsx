import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
  infinite:boolean;
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
    frameSize: 3,
    step: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      frameSize,
      step,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          getWidth={(value: number) => {
            this.setState({ itemWidth: value });
          }}
          getFrame={(value: number) => {
            this.setState({ frameSize: value });
          }}
          getStep={(value: number) => {
            this.setState({ step: value });
          }}
          getAnimationDuration={(value:number) => {
            this.setState({ animationDuration: value });
          }}
          makeInfinite={(value:boolean) => {
            this.setState({ infinite: value });
          }}
          step={step}
          frameSize={frameSize}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
