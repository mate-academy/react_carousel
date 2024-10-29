import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface Image {
  id: number;
  src: string;
}

interface State {
  images: Image[];
}

class App extends React.Component<{}, State> {
  state = {
    images: [
      { id: 1, src: './img/1.png' },
      { id: 2, src: './img/2.png' },
      { id: 3, src: './img/3.png' },
      { id: 4, src: './img/4.png' },
      { id: 5, src: './img/5.png' },
      { id: 6, src: './img/6.png' },
      { id: 7, src: './img/7.png' },
      { id: 8, src: './img/8.png' },
      { id: 9, src: './img/9.png' },
      { id: 10, src: './img/10.png' },
    ],
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel images={images} />
      </div>
    );
  }
}

export default App;
