import React from 'react';
import Carousel from './components/Carousel';
import './App.scss';

interface State {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
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
    infinite: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'infinite') {
      this.setState((prevState) => ({ infinite: !prevState.infinite }));

      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form
          className="form"
          action="#"
          method="post"
        >
          <label htmlFor="itemId" className="form__label">
            Item Width:&nbsp;

            <input
              type="number"
              className="form__input"
              name="itemWidth"
              id="itemId"
              min={130}
              max={330}
              step={20}
              value={itemWidth}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="frameId" className="form__label">
            Frame Size:&nbsp;

            <input
              type="number"
              className="form__input"
              name="frameSize"
              id="frameId"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="stepId" className="form__label">
            Step:&nbsp;

            <input
              type="number"
              className="form__input"
              name="step"
              id="stepId"
              min={1}
              value={step}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="animationDurationId" className="form__label">
            Animation Duration:&nbsp;

            <input
              type="number"
              className="form__input"
              name="animationDuration"
              id="animationDurationId"
              min={0}
              max={8000}
              step={500}
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="infiniteId" className="form__label">
            Infinite:&nbsp;

            <input
              type="checkbox"
              className="form__input form__input_checkbox"
              name="infinite"
              id="infiniteId"
              checked={infinite}
              onChange={this.handleInputChange}
            />
          </label>
        </form>

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
