import React from 'react';
import './App.css';

import Carousel from './components/Carousel';

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
    width: 130,
    count: 3,
    position: 0,
    imageSize: 130,
    step: 3,
    height: 130,
    isActive: false,
  };

  changeStep = (event) => {
    this.setState({
      step: event.target.value,
    });
  }

prevClick = () => {
  this.setState(prevState => (
    (prevState.position < 1170)
      ? {
        position: prevState.position + (prevState.width * prevState.step),
      }
      : { position: 0 }
  ));
}

nextClick = () => {
  this.setState(prevState => (
    (prevState.position > 0)
      ? {
        position: prevState.position - (prevState.width * prevState.step),
      }
      : null
  ));
}

changeItemWidth = (event) => {
  this.setState({
    imageSize: event.target.value,
  });
}

changeElementNumber = (event) => {
  this.setState({
    count: event.target.value,
  });
}

startRotate = () => {
  this.timer = setInterval(() => {
    this.setState(prevState => (
      (prevState.position < 1170)
        ? {
          isActive: true,
          position: prevState.position + (prevState.width * 1),
        }
        : { position: 0 }
    ));
  }, 2000);
}

stopRotate = () => {
  clearInterval(this.timer);
  this.setState(prevState => ({
    isActive: prevState === false,
  }));
}

render() {
  const {
    images, position, width, count, imageSize, step, height, isActive,
  } = this.state;

  return (

    <div className="App">
      {/* eslint-disable-next-line */}
       <h1>Carousel with {images.length} images</h1>

      <Carousel
        prevClick={this.prevClick}
        position={position}
        width={width}
        count={count}
        nextClick={this.nextClick}
        changeItemWidth={this.changeItemWidth}
        imageSize={imageSize}
        changeElementNumber={this.changeElementNumber}
        step={step}
        changeStep={this.changeStep}
        images={images}
        height={height}
        isActive={isActive}
        startRotate={this.startRotate}
        stopRotate={this.stopRotate}
      />
    </div>
  );
}
}

export default App;
