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
    width: 130,
    count: 3,
    position: -390,
  };

  nextImage = () => {
    this.setState(state => ({
      position: Math
        .max(state.position - (state.width * state.count), -state.width
          * (document.querySelectorAll('li').length - state.count)),
    }));
    document.querySelector('ul')
      .style.marginLeft = `${this.state.position}px`;
  }

  prevImage = () => {
    this.setState(state => ({
      position: Math.min(state.position + (state.width * state.count), 0),
    }));
    document.querySelector('ul')
      .style.marginLeft = `${this.state.position}px`;
  }

  render() {
    const { images, width, count } = this.state;

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
              <Carousel images={images} width={width} count={count} />
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
