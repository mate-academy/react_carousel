import React from 'react';
import './App.scss';

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
    itemWidth: 130,
    step: 3,
    frameSize: 3,
    animationDuration: 1000,
    infinite: false,
  };

  changeWidth = (e) => {
    this.setState({ itemWidth: +e.target.value });
  }

  changeStep = (e) => {
    this.setState({ step: +e.target.value });
  }

  changeFrame = (e) => {
    this.setState({ frameSize: +e.target.value });
  }

  changeAnimation = (e) => {
    this.setState({ animationDuration: +e.target.value });
  }

  changeInfinite = (e) => {
    this.setState(prev => ({ infinite: !prev.infinite }));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="App">
            <Carousel
              {...this.state}
              changeStep={this.changeStep}
              changeWidth={this.changeWidth}
              changeFrame={this.changeFrame}
              changeAnimation={this.changeAnimation}
              changeInfinite={this.changeInfinite}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
