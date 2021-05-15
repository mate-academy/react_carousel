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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  setValueOnState = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="title">Carousel with {images.length} images</h1>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <section className="option" onChange={this.setValueOnState}>

          <div className="input-wrapper">
            <span className="label">Step</span>
            <span className="count">{step}</span>

            <input type="range" name="step" min="1" max="5" defaultValue="3" />
          </div>

          <div className="input-wrapper">
            <span className="label">Smile Size</span>
            <span className="count">{itemWidth}</span>

            <input
              type="range"
              name="itemWidth"
              min="70"
              max="200"
              defaultValue="130"
            />
          </div>

          <div className="input-wrapper">
            <span className="label">Frame Size</span>
            <span className="count">{frameSize}</span>

            <input
              type="range"
              name="frameSize"
              min="1"
              max="5"
              defaultValue="3"
            />
          </div>

          <div className="input-wrapper">
            <span className="label">Animation Duration</span>
            <span className="count">{animationDuration}</span>

            <input
              type="range"
              name="animationDuration"
              min="250"
              max="5000"
              step="250"
              defaultValue="1000"
            />
          </div>        
        </section>
      </div>
    );
  }
}

export default App;
