import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  indexVisibleImages: number[];
  frameSize: number;
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
    indexVisibleImages: [],
    frameSize: 3,
    step: 3,
    itemWidth: 130,
  };

  componentDidMount() {
    const { frameSize } = this.state;

    this.setState({
      indexVisibleImages: Array.from({ length: frameSize }, (_, i) => i),
    });
  }

  onPageChange = (nextIndexOfImages: number[]) => {
    this.setState({
      indexVisibleImages: [...nextIndexOfImages],
    });
  };

  render() {
    const {
      images,
      indexVisibleImages,
      frameSize,
      step,
      itemWidth,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>
        <Carousel
          images={images}
          indexVisibleImages={indexVisibleImages}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={1000}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}

export default App;
