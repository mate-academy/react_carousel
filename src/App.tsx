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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numberValue = parseInt(value, 10) || 0;

    // eslint-disable-next-line max-len, prettier/prettier
    this.setState({ [name]: numberValue } as unknown as Pick<State,keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <div className="container">
          {/* eslint-disable-next-line */}
          <h1 className='title' data-cy='title'>Carousel with {images.length} images</h1>

          <div className="form">
            <label htmlFor="itemId">Item Width</label>
            <input
              type="number"
              id="itemId"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleChange}
            />

            <label htmlFor="frameId">Frame Size</label>
            <input
              type="number"
              id="frameId"
              name="frameSize"
              value={frameSize}
              onChange={this.handleChange}
            />

            <label htmlFor="stepId">Step</label>
            <input
              type="number"
              id="stepId"
              name="step"
              value={step}
              onChange={this.handleChange}
            />

            <label htmlFor="animationDuration">Animation Duration (ms)</label>
            <input
              type="number"
              id="animationDuration"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleChange}
            />
          </div>

          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={false}
          />
        </div>
      </div>
    );
  }
}

export default App;
