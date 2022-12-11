import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  // infinite: boolean;
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
    step: 2,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    // infinite: false,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const input = event.target.value;

    this.setState(state => (
      {
        ...state,
        [key]: +input,
      }
    ));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      // infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          // animationDuration={1000}
          // infinite={infinite}
        />
        <div>
          <label htmlFor="itemWidth">Item Width:</label>
          <input
            type="number"
            value={itemWidth}
            onChange={(event) => this.handleChange(event, 'itemWidth')}
            id="itemWidth"
          />
        </div>
        <div>
          <label htmlFor="frameSize">Frame size:</label>
          <input
            type="number"
            value={frameSize}
            onChange={(event) => this.handleChange(event, 'frameSize')}
            id="frameSize"
          />
        </div>
        <div>
          <label htmlFor="step">step:</label>
          <input
            type="number"
            value={step}
            onChange={(event) => this.handleChange(event, 'step')}
            id="step"
          />
        </div>
        <div>
          <label htmlFor="animationDuration">Animation duration:</label>
          <input
            type="number"
            value={animationDuration}
            onChange={(event) => this.handleChange(event, 'animationDuration')}
            id="animationDuration"
          />
        </div>
      </div>
    );
  }
}

export default App;
