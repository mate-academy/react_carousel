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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: Number(event.target.value) });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: Number(event.target.value) });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(event.target.value) });
  };

  handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ animationDuration: Number(event.target.value) });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="controls">
          <div>
            <span>Item width</span>
            <input
              type="number"
              id="itemId"
              ref={element => {
                if (element) {
                  element.setAttribute('for', 'itemId');
                }
              }}
              aria-label="Item width"
              value={itemWidth}
              onChange={this.handleItemWidthChange}
            />
          </div>

          <div>
            <span>Frame size</span>
            <input
              type="number"
              id="frameId"
              ref={element => {
                if (element) {
                  element.setAttribute('for', 'frameId');
                }
              }}
              aria-label="Frame size"
              value={frameSize}
              onChange={this.handleFrameSizeChange}
            />
          </div>

          <div>
            <span>Step</span>
            <input
              type="number"
              id="stepId"
              ref={element => {
                if (element) {
                  element.setAttribute('for', 'stepId');
                }
              }}
              aria-label="Step"
              value={step}
              onChange={this.handleStepChange}
            />
          </div>

          <div>
            <span>Animation duration</span>
            <input
              type="number"
              id="animationDurationId"
              ref={element => {
                if (element) {
                  element.setAttribute('for', 'animationDurationId');
                }
              }}
              aria-label="Animation duration"
              value={animationDuration}
              onChange={this.handleAnimationDurationChange}
            />
          </div>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
