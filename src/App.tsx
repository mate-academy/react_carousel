import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
}

class App extends React.Component<{}, State> {
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
    frameSize: 3,
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrameSize = parseInt(event.target.value, 10);

    this.setState((prevState) => ({
      frameSize: Number.isNaN(newFrameSize)
        ? prevState.frameSize : newFrameSize,
    }));
  };

  handleIncrementFrameSize = () => {
    this.setState((prevState) => ({ frameSize: prevState.frameSize + 1 }));
  };

  handleDecrementFrameSize = () => {
    this.setState((prevState) => ({
      frameSize: Math.max(prevState.frameSize - 1, 1),
    }));
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault();

      this.setState({ frameSize: 0 });
    }
  };

  render() {
    const { images, frameSize } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          Carousel with
          {images.length}
          images
        </h1>

        <div className="FrameSizeForm">
          <label>
            Images to Display:
            <input
              type="number"
              value={frameSize === 0 ? '' : frameSize}
              onChange={this.handleFrameSizeChange}
              onKeyDown={this.handleKeyDown}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={130}
          animationDuration={1000}
          frameSize={frameSize === 0 ? 3 : frameSize}
        />
      </div>
    );
  }
}

export default App;
