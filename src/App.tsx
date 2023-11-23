import React, { ChangeEvent } from 'react';
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

  handleFrameSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFrameSize = parseInt(event.target.value, 10);

    if (!Number.isNaN(newFrameSize)
      && newFrameSize >= 1 && newFrameSize <= 10) {
      this.setState({
        frameSize: newFrameSize,
      });
    }
  };

  handleItemWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newItemWidth = parseInt(event.target.value, 10);

    if (!Number.isNaN(newItemWidth)) {
      this.setState({
        itemWidth: newItemWidth,
      });
    }
  };

  handleStepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value, 10);

    if (!Number.isNaN(newStep) && newStep >= 1 && newStep <= 10) {
      this.setState({
        step: newStep,
      });
    }
  };

  handleAnimationDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(event.target.value, 10);

    if (!Number.isNaN(newDuration) && newDuration >= 0) {
      this.setState({
        animationDuration: newDuration,
      });
    }
  };

  render() {
    const {
      images,
      frameSize,
      step,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>
        <div>
          <label htmlFor="itemId">Item Width:</label>
          <input
            type="number"
            id="itemId"
            value={itemWidth}
            onChange={this.handleItemWidthChange}
            className="small-input"
          />
        </div>

        <div>
          <label htmlFor="frameId">Frame Size:</label>
          <input
            type="number"
            id="frameId"
            value={frameSize}
            min="1"
            max="10"
            onChange={this.handleFrameSizeChange}
            className="small-input"
          />
        </div>

        <div>
          <label htmlFor="stepId">Scroll Step:</label>
          <input
            type="number"
            id="stepId"
            value={step}
            min="1"
            max="10"
            onChange={this.handleStepChange}
            className="small-input"
          />
        </div>

        <div>
          <label htmlFor="animationDurationInput">
            Animation:
          </label>
          <input
            type="number"
            id="animationDurationInput"
            value={animationDuration}
            min="0"
            onChange={this.handleAnimationDurationChange}
            className="small-input"
          />
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          onPageChange={() => { }}
        />
      </div>
    );
  }
}

export default App;
