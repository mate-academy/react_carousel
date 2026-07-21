import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="controls">
          <label htmlFor="stepId">Step: </label>
          <input
            id="stepId"
            type="text"
            value={step}
            onChange={e => this.setState({ step: +e.target.value || 0 })}
          />

          <label htmlFor="itemId">Item Size:
            <input
              type="text"
              value={itemWidth}
              onChange={e => this.setState({ itemWidth: +e.target.value || 0 })}
              id="itemId"
            /></label>


          <label htmlFor="frameId">
            Frame Size:
            <input
              type="text"
              value={frameSize}
              onChange={e => this.setState({ frameSize: +e.target.value || 0 })}
              id="frameId"
            /></label>


          <label htmlFor="animationId">Animation duration:
            <input
              type="text"
              value={animationDuration}
              onChange={e => this.setState({ animationDuration: +e.target.value || 0 })} />
          </label>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
