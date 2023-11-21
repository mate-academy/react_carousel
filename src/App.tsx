import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
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
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <form className="App__form" action="/">

          <label className="App__label">
            Box Width:
            <input
              className="App__input"
              type="number"
              min={130}
            />
          </label>

          <label className="App__label">
            Frame Size:
            <input
              className="App__input"
              type="number"
              min={1}
              max={10}
            />
          </label>

          <label className="App__label">
            Step:
            <input
              className="App__input"
              type="number"
              min={1}
            />
          </label>

          <label className="App__label">
            Animation Duration:
            <input
              className="App__input"
              type="number"
              min={500}
              step={500}
            />
          </label>

        </form>
        <Carousel />
      </div>
    );
  }
}

export default App;
