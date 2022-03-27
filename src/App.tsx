import './App.scss';
import { Component } from 'react';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
}

export class App extends Component<{}, State> {
  state = {
    images: [
      '../img/1.png',
      '../img/2.png',
      '../img/3.png',
      '../img/4.png',
      '../img/5.png',
      '../img/6.png',
      '../img/7.png',
      '../img/8.png',
      '../img/9.png',
      '../img/10.png',
    ],
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1>
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel images={images} />
      </div>
    );
  }
}
