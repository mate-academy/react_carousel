import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

type Props = {
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
};

class App extends React.Component<Props, State> {
  state: State = {
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
    const {
      itemWidth = 130,
      frameSize = 3,
      step = 3,
      animationDuration = 1000,
    } = this.props;

    return (
      <div className="App">
        <h1 className="title" data-cy="title">
          Carousel with {images.length} images
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
