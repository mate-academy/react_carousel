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
    infinite: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: Number(value) || 0,
    }));
  };

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1>Carousel with {images.length} images</h1>
        <div className="form-container">
          <label className="label" htmlFor="itemId">
            Item Width:
          </label>
          <input
            id="itemId"
            type="number"
            name="itemWidth"
            className="input-field"
            value={itemWidth}
            onChange={this.handleInputChange}
            data-cy="itemWidth"
          />

          <label className="label" htmlFor="frameId">
            Frame Size:
          </label>
          <input
            id="frameId"
            type="number"
            name="frameSize"
            className="input-field"
            value={frameSize}
            onChange={this.handleInputChange}
            data-cy="frameSize"
          />

          <label className="label" htmlFor="stepId">
            Step:
          </label>
          <input
            id="stepId"
            type="number"
            name="step"
            className="input-field"
            value={step}
            onChange={this.handleInputChange}
            data-cy="step"
          />

          <label className="label" htmlFor="animationDuration">
            Animation Duration:
          </label>
          <input
            id="animationDuration"
            type="number"
            name="animationDuration"
            className="input-field"
            value={animationDuration}
            onChange={this.handleInputChange}
            data-cy="animationDuration"
          />

          <div className="checkbox-container">
            <label>
              Infinite:
              <input
                type="checkbox"
                name="infinite"
                checked={infinite}
                onChange={this.handleCheckboxChange}
                data-cy="infinite"
              />
            </label>
          </div>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
