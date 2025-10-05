import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  componentDiDMount() {
    document.title = 'Carousel - Demo';
  }

  handleItemWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: Number(e.target.value) });
  };

  handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: Number(e.target.value) });
  };

  handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(e.target.value) });
  };

  handleAnimationDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: Number(e.target.value) });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div>
          <label htmlFor="itemId">Item Width (px):</label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={this.handleItemWidthChange}
          />
        </div>

        <div>
          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={this.handleFrameSizeChange}
          />
        </div>

        <div>
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={this.handleStepChange}
          />
        </div>

        <div>
          <label htmlFor="animationDurationId">Animation Duration (ms):</label>
          <input
            id="animationDurationId"
            type="number"
            value={animationDuration}
            onChange={this.handleAnimationDurationChange}
          />
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
