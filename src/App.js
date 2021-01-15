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
    frameSize: 3,
    step: 3,
    position: -390,
    infinite: true,
  };

  nextImage = () => {
    this.setState(state => ({
      position: state.infinite === true && state.position === -910 ? 0 : Math
        .max(state.position - (state.itemWidth * state.frameSize),
          -state.itemWidth * (document
            .querySelectorAll('li').length - state.step)),
    }));
    document.querySelector('ul')
      .style.marginLeft = `${this.state.position}px`;
  }

  prevImage = () => {
    this.setState(state => ({
      position: state.position === 0 ? -910 : Math.min(state.position
        + (state.itemWidth * state.frameSize), 0),
    }));
    document.querySelector('ul')
      .style.marginLeft = `${this.state.position}px`;
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1>{`Carousel with ${images.length} images`}</h1>
        <div className="App__container">
          <button
            type="button"
            className="button"
            onClick={this.prevImage}
          >
            &#8656;
          </button>

          <div className="Carousel">
            <ul className="Carousel__list">
              <Carousel images={images} />
            </ul>
          </div>

          <button
            type="button"
            className="button"
            onClick={this.nextImage}
          >
            &#8658;
          </button>
        </div>
      </div>
    );
  }
}

export default App;
