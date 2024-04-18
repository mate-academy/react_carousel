import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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
    step: 1,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  handlerChangeSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          onChangeSettings={this.handlerChangeSettings}
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
