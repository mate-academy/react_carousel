import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  infinite: boolean,
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
    // eslint-disable-next-line react/no-unused-state
    infinite: false,
  };

  render() {
    const {
      images,

    } = this.state;

    return (
      <div className="App">
        <h1>Carousel </h1>

        <Carousel
          images={images}
        />
      </div>
    );
  }
}

export default App;
