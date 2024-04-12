import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newValue: number;

    if (+value < 1) {
      newValue = 0;
    } else if (name === 'itemWidth' && +value > 350) {
      newValue = 350;
    } else if (name === 'frameSize' && +value > 4) {
      newValue = 4;
    } else if (name === 'step' && +value > 10) {
      newValue = 10;
    } else {
      newValue = +value;
    }

    this.setState(prevState => ({
      ...prevState,
      [name]: +newValue,
    }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <form action="#" className="control-panel">
          <h2 className="control-panel__title">control panel</h2>
          <label htmlFor="stepId" className="control-panel__label">
            step:
            <input
              id="stepId"
              type="number"
              name="step"
              className="control-panel__input"
              value={step}
              min={1}
              max={10}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="frameId" className="control-panel__label">
            frameSize:
            <input
              id="frameId"
              type="number"
              name="frameSize"
              className="control-panel__input"
              value={frameSize}
              min={1}
              max={5}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="itemId" className="control-panel__label">
            itemWidth:
            <input
              id="itemId"
              type="number"
              name="itemWidth"
              className="control-panel__input"
              value={itemWidth}
              min={50}
              max={300}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="animationDuration" className="control-panel__label">
            animationDuration:
            <input
              id="animationDuration"
              type="number"
              name="animationDuration"
              className="control-panel__input"
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>
        </form>

        <article className="App__infinite">
          <h4 className="App__infinite-title">Activate infinite scrolling</h4>

          <button
            className="App__infinite-button"
            disabled
            title="To activate infinite scrolling
            you must have a premium subscription"
          >
            press
          </button>
        </article>
      </div>
    );
  }
}

export default App;
