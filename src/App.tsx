import { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { Frame } from './types/Frame';
import './App.scss';
import { Carousel } from './components/Carousel';

const imagesFromServer = [
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
];

interface State {
  frames: Frame[];
}

class App extends Component<{}, State> {
  state = {
    frames: imagesFromServer.map(image => ({
      image,
      id: uuid(),
    })),
  };

  render() {
    const { frames } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {frames.length} images</h1>

        <Carousel images={frames} />
      </div>
    );
  }
}

export default App;
