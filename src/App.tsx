import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  setStep = (value: number) => {
    this.setState({
      step: value
    })
  }

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
    this.state; 

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title'>Carousel with {this.state.images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          setStep={this.setStep}
        />
      </div>
    );
  }
}

export default App;
