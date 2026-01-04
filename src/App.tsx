import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: number;
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
    frameSize: 3,
    step: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numberValue = Number(value);

    this.setState({
      [name]: Math.max(1, numberValue),
    } as Pick<State, 'frameSize' | 'step' | 'itemWidth' | 'animationDuration'>);
  };

  render() {
    const { images, frameSize, step, itemWidth, animationDuration } =
      this.state;

    return (
      <>
        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          name="step"
          type="number"
          value={step}
          onChange={this.handleFrameSizeChange}
        />
        <label htmlFor="frameId">Frame Size</label>
        <input
          id="frameId"
          name="frameSize"
          type="number"
          value={frameSize}
          onChange={this.handleFrameSizeChange}
        />
        <label htmlFor="itemId">Item Width</label>
        <input
          id="itemId"
          name="itemWidth"
          type="number"
          value={itemWidth}
          onChange={this.handleFrameSizeChange}
        />
        <label htmlFor="animationDuration">Animation Duration</label>
        <input
          id="animationDurationId"
          name="animationDuration"
          type="number"
          value={animationDuration}
          onChange={this.handleFrameSizeChange}
        />
        <div className="App">
          <h1 data-cy="title">Carousel with {images.length} images</h1>
          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
          />
        </div>
      </>
    );
  }
}

export default App;
