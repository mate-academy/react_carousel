import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(1);

    // document.addEventListener('contextmenu', this.stopClock);
    // document.addEventListener('click', this.startClock);
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1>
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={4}
          frameSize={4}
          itemWidth={250}
          animationDuration={1000}
          infinity={false}
        />
      </div>
    );
  }
}

export default App;
