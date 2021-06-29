/* eslint-disable no-plusplus */
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
  };

  changeArrayNext = (step) => {
    const { images } = this.state;

    this.setState({
      images: [...images.slice(step), ...images.slice(0, step)],
    });
  }

  changeArrayPrev = (step) => {
    const { images } = this.state;
    const a = images.length - step;

    this.setState({
      images: [...images.slice(a), ...images.slice(0, a)],
    });
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={3}
          frameSize={3}
          itemWidth={130}
          animationDuration={1000}
          infinite={true}
          changeArrayNext={this.changeArrayNext}
          changeArrayPrev={this.changeArrayPrev}
        />
      </div>
    );
  }
}

export default App;
