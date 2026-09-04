import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  imageWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    imageWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images, imageWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={imageWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <label htmlFor="itemId">Image Width:</label>
        <input
          id="itemId"
          type="number"
          value={imageWidth}
          onChange={e => this.setState({ imageWidth: Number(e.target.value) })}
          style={{ width: '80px' }}
        />
        <label htmlFor="frameId">Frame Size:</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={e => this.setState({ frameSize: Number(e.target.value) })}
          style={{ width: '80px' }}
        />
        <label htmlFor="stepId">Step:</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={e => this.setState({ step: Number(e.target.value) })}
          style={{ width: '80px' }}
        />
        <label htmlFor="animationDuration">Animation Duration:</label>
        <input
          id="animationDuration"
          type="number"
          value={animationDuration}
          onChange={e =>
            this.setState({ animationDuration: Number(e.target.value) })
          }
          style={{ width: '80px' }}
        />
        <label htmlFor="infiniteId">Infinite:</label>
        <input
          id="infiniteId"
          type="checkbox"
          onChange={e => this.setState({ infinite: e.target.checked })}
        />
      </div>
    );
  }
}

export default App;
