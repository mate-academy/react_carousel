import React from 'react';
import './App.scss';

import { CarouselSettings } from './components/CarouselSettings';
import Carousel from './components/Carousel/Carousel';

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

  changeState = (value, field) => {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="App">
            <Carousel
              {...this.state}
            />
          </div>

          <CarouselSettings
            {...this.state}
            changeState={this.changeState}
          />
        </div>
      </div>
    );
  }
}

export default App;
