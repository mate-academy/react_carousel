/* eslint-disable react/no-access-state-in-setstate */
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

    marginLeft: 0,
  };

  moveImages = ev => ((ev.target.className === 'left')
    ? (
      this.setState(() => ({ marginLeft: this.state.marginLeft - 130 }))
    )
    : (
      this.setState({ marginLeft: this.state.marginLeft + 130 })
    ))

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1>
          Carousel with
          {images.length}
          images
        </h1>

        <Carousel

          images={images}
          margin={this.state.marginLeft}
          previous={this.moveImages}
        />
      </div>
    );
  }
}

export default App;
