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

  componentDidMount() {
    document.title = 'Carousel';
  }

  componentDidUpdate() {
    document.title = 'Carousel';
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const stateKey = name === 'fnimationDuration' ? 'animationDuration' : name;
    const updatedState = { [stateKey]: Number(value) };

    this.setState(updatedState as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="controls">
          <label htmlFor="itemId">
            Item Width:
            <input
              id="itemId"
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              name="step"
              value={step}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="durationId">
            fnimationDuration:
            <input
              id="durationId"
              type="number"
              name="fnimationDuration"
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>
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
