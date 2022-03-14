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
        <h1 className="App__title">{`Carousel with ${images.length} images`}</h1>

        <Carousel
          images={images}
        />
        <Carousel
          images={images}
          itemWidth={200}
          frameSize={2}
          step={1}
          animationDuration={300}
          infinite
        />
      </div>
    );
  }
}

export default App;
