import { Component } from 'react';
import Carousel from './components/Carousel';
import './App.scss';

interface State {
  images: string[];
}

class App extends Component<{}, State> {
  state: Readonly<State> = {
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
        <h1 data-cy="title" className="title">Carousel with {images.length} images</h1>

        <Carousel images={images} />
      </div>
    );
  }
}

export default App;
