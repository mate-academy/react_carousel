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

  handleInputChange(name: keyof State, value: number | unknown) {
    this.setState({ [name]: value } as Pick<State, keyof State>);
  }

  render() {
    const {
      images, itemWidth, frameSize, step, animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div>
          <label>
            Item Width:
            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              // eslint-disable-next-line max-len
              onChange={(e) => this.handleInputChange('itemWidth', parseInt(e.target.value, 10))}
            />
          </label>
          <label>
            Frame Size:
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              // eslint-disable-next-line max-len
              onChange={(e) => this.handleInputChange('frameSize', parseInt(e.target.value, 10))}
            />
          </label>
          <label>
            Step:
            <input
              type="number"
              name="step"
              value={step}
              // eslint-disable-next-line max-len
              onChange={(e) => this.handleInputChange('step', parseInt(e.target.value, 10))}
            />
          </label>
          <label>
            Animation Duration (ms):
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              // eslint-disable-next-line max-len
              onChange={(e) => this.handleInputChange('animationDuration', parseInt(e.target.value, 10))}
            />
          </label>
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
