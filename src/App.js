import React from 'react';
import './App.css';
import Carousel from './components/Carousel';
import imagesFromServer from './api/images.json';

class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {imagesFromServer.length} images</h1>

        <Carousel
          images={imagesFromServer}
          step={3}
          frameSize={3}
          itemWidth={130}
          animationDuration={1000}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
