import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  step: number;
  animationDuration: number;
  itemWidth: number;
}

class App extends React.Component<{}, State> {
  state = {
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    itemWidth: 130,
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

  handleInputItemSize: (input: number) => void = input => {
    if (Number.isNaN(input)) {
      return;
    }

    this.setState({ itemWidth: input });
  };

  render() {
    const { images } = this.state;

    return (
      <>
        <div className="App">
          {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

          <Carousel
            images={this.state.images}
            frameSize={this.state.frameSize}
            step={this.state.step}
            animationDuration={this.state.animationDuration}
            itemWidth={this.state.itemWidth}
          />

          <input
            name="item_size"
            type="number"
            value={this.state.itemWidth}
            onChange={event => this.handleInputItemSize(+event.target.value)}
          />
        </div>
      </>
    );
  }
}

export default App;
